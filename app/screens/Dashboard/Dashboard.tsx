import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, StyleSheet, StatusBar, ActivityIndicator, BackHandler, Image, DeviceEventEmitter } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { IconButton } from '../../components/Buttons/IconButton';
import scale from '../../utils/scale';
import * as Location from 'expo-location';
import Container from '../../components/Container/Container';
import { RegularText, SemiBoldText } from '../../components/Typography/Typography';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { mapStyle } from '../../utils/mapStyle';
import { AlertConfig, Screen } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { toggleAlert, toggleConfirmation } from '../../store/modalSlice';
import { locationRationale } from '../../utils/constants';
import { setConfirmationFunction, showToast } from '../../utils/utils';
import ControlSheet from './ControlSheet';
import { getNearbyPlaces } from '../../utils/api';
import { GeofencingEventType } from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const Dashboard: React.FC<Screen> = ({navigation, route}) => {
  //GLOBAL STATE
  const {theme} = useSelector((state: RootState) => state.appSetting);
  const dispatch = useDispatch();

  //LOCAL STATE
  const [locationWatcher, setLocationWatcher] = useState<any>(); //object that watches location and can be used to stop location watch
  const [initialRegion, setInitialRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [location, setLocation]: any = useState(null);
  const [address, setAddress]: any = useState(null);
  const [pointsOfInterests, setPointOfInterest] = useState<any>([]);
  const [locationEnabled, setLocationEnabled] = useState(false);

    const [showMap, setShowMap] = useState(false);
    const [isWatching, setIsWatching] = useState(false);
    const [currentAccuracy, setCurrentAccuracy] = useState({
      title: 'Navigation',
      value: Location.LocationAccuracy.BestForNavigation,
    });

    // frequency state
    const [frequency, setFrequency] = useState({
      title: 'Medium',
      value: 4000,
    });

    const handleBack = ()=> {
      navigation.goBack();
      return true
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBack);
        return ()=> {
            BackHandler.removeEventListener("hardwareBackPress", handleBack);
        }
    }, [])

    useEffect(() => {
      checkLocationPermission();
      DeviceEventEmitter.addListener('disableTracking', handleStopPress);
      return ()=> DeviceEventEmitter.removeAllListeners('disbaleTracking')
    }, [])

    const checkLocationPermission = async ()=> {
      const permission = await Location.getForegroundPermissionsAsync();
      // console.log(permission);
      if(!permission.granted) {
        showRationale();
        return
      }
      watchPosition();
    }

    const showRationale = ()=> {
      const alert: AlertConfig = {
        title: locationRationale.title,
        message: locationRationale.message,
      }
      dispatch(toggleConfirmation(alert));
      setConfirmationFunction(requestPermission);
    }

    // request location permission and gets location if permission is granted
    const requestPermission = async ()=> {
      // let { status } = await Location.requestForegroundPermissionsAsync();
      let { status } = await Location.requestForegroundPermissionsAsync();
      // console.log(status)
      if (status !== 'granted') {
        // setErrorMsg('Permission to access location was denied');
        const alert: AlertConfig = {
          title: 'Error',
          message: 'Permission to access location was denied',
        }
        dispatch(toggleAlert(alert));
        return;
      }
      watchPosition();
    }

    // takes an optional argument to configue the parameters of the function as state does not update fast enough at runtime
    const watchPosition = async (type?: 'accuracy' | 'frequency', value?: any)=> {
      // console.log('Frequency', frequency);
      try {
        const locationObj = await Location.watchPositionAsync(
        {
          accuracy: type === 'accuracy' ? value : currentAccuracy.value, 
          timeInterval: type === 'frequency' ? value : frequency.value,
        },handleWatchData);
        // useful for stopping location watch
        setLocationWatcher(locationObj);
        setIsWatching(true);
      } catch (error) {
        // console.log(error);
        dispatch(toggleAlert({
          title: 'Error',
          message: 'Unable to watch position',
        }))
      }
    }

    useEffect(() => {
      setAvailabilityInterval();
    }, []);

    const setAvailabilityInterval = ()=> {
      setInterval(()=> {
        checkLocationAvailability();
      }, 5000)
    }

    const checkLocationAvailability = async () => {
      const pos = await Location.getLastKnownPositionAsync({
        // This should be equal or more than timeInterval in watchPositionAsync
        maxAge: 5000,
        // Can use the same as in watchPositionAsync or less
        requiredAccuracy: currentAccuracy.value,
      });
      console.log("POSSS", pos)
      if (!pos) {
        const alert: AlertConfig = {
          title: 'Error',
          message: 'Location services seems to be disabled, check device settings',
        }
        dispatch(toggleAlert(alert));
      }
    };
    
    // handle data gotten fro watch
    const handleWatchData = async (data: any)=> {
      setLocation(data);
      let region = {...initialRegion};
      region.latitude = data.coords.latitude;
      region.longitude = data.coords.longitude;
      setInitialRegion(region);
      setShowMap(true);
      const userAddress = await getAddress(data.coords.latitude, data.coords.longitude);
      setAddress(userAddress);
      // checkEnabled();
    }

    // called onregion change
    const onRegionChange = async (region: any) => {
      setAddress('Getting address...');
      const userAddress = await getAddress(region.latitude, region.longitude);
      // console.log(userAddress);
      setAddress(userAddress);
    }

    let mapRef: any = useRef();
    //pans to user's current location
    const goToLocation = ()=> {
      // console.log(location);
      const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      }
      mapRef.current.animateToRegion(coords);
      // Location.watchPositionAsync()
    }

    // get address from reverse geocoding
    const getAddress = async (lat: string, long: string)=> {
      // console.log(`lat: ${lat}, long: ${long}`);
      const res: Geocoder.GeocoderResponse = await Geocoder.from({
        latitude: Number(lat),
        longitude: Number(long),
      })
      // console.log(res);
      const address = res.results[0].formatted_address;
      if(pointsOfInterests.length === 0) {
        // setPointOfInterest(newPoints);
        const newPoints = await getNearbyPlaces(lat, long);
        // console.log('NEW POINTS: ', newPoints);
        const finalList = newPoints.data.results;
        finalList.length = 10;
        setPointOfInterest(finalList);
        registerGeofence(finalList);
      }
      return address
    }

    // register geofence
    const registerGeofence = async (list: Array<any>)=> {
      // console.log('AYAMA', list)
      const locationRegion = [...list].map((item) => {
        return {
          ...item.geometry.location,
          radius: 500,
          latitude: item.geometry.location.lat,
          longitude: item.geometry.location.lng
        }
      });
      // console.log("Region", locationRegion)
      TaskManager.defineTask('GEO_FENCE', handleGeofence);
      await Location.startGeofencingAsync('GEO_FENCE', locationRegion)
    }

    // handle geofence data
    const handleGeofence = ({ data: { eventType, region }, error }: any)=> {
      if (error) {
        // check `error.message` for more details.
        return;
      }
      if (eventType === GeofencingEventType.Enter) {
        showToast('You have entered a new point of interest');
      } else if (eventType === GeofencingEventType.Exit) {
        showToast('You have exited a point of interes');
      }
    }

    // handles stop button press
    const handleStopPress = async ()=> {
      locationWatcher.remove();
      setIsWatching(false);
    }

    // handles play button press
    const handlePlayPress = ()=> {
      // locationWatcher.remove();
      setIsWatching(true);
      watchPosition();
    }

    return (
      <Container style={{padding: 0}}>
          <StatusBar backgroundColor = "transparent" translucent={true} barStyle="dark-content" />
          { showMap ? (
            <MapView
              style ={styles.map}
              customMapStyle={mapStyle}
              initialRegion={initialRegion}
              provider = {PROVIDER_GOOGLE}
              showsUserLocation
              minZoomLevel = {12}
              ref = {mapRef}
              showsCompass = {false}
              showsMyLocationButton = {false}
              onRegionChangeComplete={onRegionChange}
              // mapType="mutedStandard"
            >
              {pointsOfInterests.map((point: any, index: number) => (
                <Marker identifier={`Marker${index}`} key={index}
                  coordinate={{
                    latitude: point?.geometry?.location?.lat,
                    longitude: point?.geometry?.location?.lng,
                  }}
                  tracksViewChanges={true}
                  // ref={markerRef1}
                  style={{position: 'absolute', left: 0}}
                >
                  <Image 
                  style={{height: scale(30), width: scale(150), resizeMode: 'contain', aspectRatio: 1}} 
                    source={point.types.includes('food') ? require('../../../assets/custom-markers/food.png') : 
                    point.types.includes('place_of_worship') ? require('../../../assets/custom-markers/wellbeing.png') : 
                    point.types.includes('wellbeing') ? require('../../../assets/custom-markers/wellbeing.png') :
                    point.types.includes('wellbeing') ? require('../../../assets/custom-markers/wellbeing.png') : require('../../../assets/custom-markers/default.png')} 
                  />
                  <Callout style={{width: 'auto', minWidth: 150, maxWidth: 300}}>
                    <View>
                      <Image source={{uri: point.icon}} style={{width: '100%', height: scale(30), resizeMode: 'contain'}} />
                    </View>
                    <View style={{padding: scale(10), backgroundColor: theme.light.main, width: scale(100)}}>
                      <RegularText title={point.name} size={10} lines={1} />
                    </View>
                    <View style={{padding: scale(10), backgroundColor: theme.light.main, width: scale(100)}}>
                      <RegularText title={point.vicinity} size={10} lines={3} />
                    </View>
                  </Callout>
                </Marker>
              ))}
            </MapView> ) : 
              (
                <ActivityIndicator color={theme.primary.main} size={25} style={{flex: 1}} />
              )
          }
          <MaterialCommunityIcons name="map-marker" color={theme.danger.main} style = {styles.centeredMarker} size = {40} />
          <View style={[styles.addressBar, {backgroundColor: theme.light[100]}]}>
              <MaterialCommunityIcons name="map-marker" color={theme.neutral.main} style = {styles.crossHairs} />
              <RegularText title={address}  color={theme.primary.main} />
          </View>
          <View style={styles.locationIconBtn}>
            {/* <IconButton onPress ={goToLocation}
              icon={<MaterialCommunityIcons name="crosshairs" color={theme.primary.main} size={25} />} backgroundColor={theme.light[100]} /> */}
          </View>
          <ControlSheet showMap={showMap} isWatching={isWatching} 
            onStopPress={handleStopPress} 
            onPlayPress = {handlePlayPress} 
            onSelectAccuracy={(acc)=> {
              setCurrentAccuracy(acc);
              handleStopPress();
              watchPosition('accuracy', acc.value);
            }}
            accuracyValue={currentAccuracy.title}
            frequencyValue={frequency.title}
            navigation={navigation}
            onSelectFrequency={(freq)=> {
              setFrequency(freq);
              handleStopPress();
              watchPosition('frequency', freq.value);
            }}
            onPressCenter={goToLocation}
          />
      </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        // height: '100%',
        // width: 400,
    },
    mainLoader: {
        flex: 1,
    },
    backBtn: {
        position: 'absolute',
        marginTop: '10%',
        marginLeft: 20,
        height: 25,
        width: 55,
        borderWidth: 2,
        borderColor: '#E5E5E5',
    },
    addressBar: {
        // flexDirection: 'row',
        position: 'absolute',
        marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + scale(10) : scale(50),
        borderRadius: 15,
        // width: '90%',
        alignSelf: 'center',
        padding: scale(10),
        // alignItems: "center",
        justifyContent: "center",
        marginHorizontal: '5%'
    },
    addressText: {
        flex: 8,
    },
    markerIcon: {
        flex: 1,
        marginLeft: '10%',
    },
    locationIconBtn: {
        position: 'absolute',
        // top: 80 / 100 * ScreenHeight,
        right: scale(20),
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 35 / 100 * ScreenHeight,
    },
    crossHairs: {
        alignSelf: 'center',
        fontSize: 15,
        // marginHorizontal: 15,
    },
    centeredMarker: {
        position: 'absolute',
        marginTop: 47 / 100 * ScreenHeight,
        alignSelf: 'center',
    },

    map: {
        height: '100%',
    },
    doneBtn: {
        position: 'absolute',
        marginTop: 90 / 100 * ScreenHeight,
        alignSelf: 'center',
        width: 90 / 100 * ScreenWidth,
    },
});

export default Dashboard
