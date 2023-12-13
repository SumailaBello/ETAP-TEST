import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, StatusBar, Pressable} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/Buttons/Button';
// import { Image } from 'react-native-animatable';
import Container from '../../components/Container/Container';
import { RegularText, BoldText, SemiBoldText } from '../../components/Typography/Typography';
import { RootState } from '../../store/store';
import CONSTANTS from '../../utils/constants';
import scale from '../../utils/scale';
import { Screen } from '../../utils/types';
import Swiper from 'react-native-web-swiper';
import {navigate} from '../../utils/utils';
import FeatherIcon from '@expo/vector-icons/Feather';
import { toggleLoggedIn } from '../../store/appSettings';

// const {theme} = CONSTANTS;
const Onboarding: React.FC<Screen> = ({navigation, route}) => {
    //GLOBAL STATE
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const dispatch = useDispatch();

    //LOCAL STATE
    const [currentIndex, setCurrentIndex] = useState(0);
    const {DEVICE_WIDTH, IS_IOS} = CONSTANTS;
    let swiperRef: any;

    const handleIndexChanged = (index: any)=> {
        setCurrentIndex(index);
    }

    // go to next slide
    const nextSlide = ()=> {
        if (currentIndex < 2 ) {
            const destIndex = currentIndex + 1;
            swiperRef.goTo(destIndex);
            setCurrentIndex(destIndex);
        }
    }
    
    return (
        // <View style={{flex:1,backgroundColor: 'white'}}>
        <Container style={{paddingTop: StatusBar.currentHeight, paddingHorizontal: 0}}>
            <StatusBar backgroundColor={theme.light.main} barStyle="dark-content" />
            <View style={{flex: 1, alignItems: "center", paddingTop: IS_IOS ? scale(10) : undefined}}>
                <Image source={require('../../../assets/etap-logo.webp')} style={styles.logo} />
            </View>
            <View style = {{flex: 9}}>
                <Swiper ref={(ref: any) => {swiperRef = ref;}}
                    controlsEnabled={false}
                    onIndexChanged={handleIndexChanged}
                >
                    <View style={[{marginTop: scale(20), flex: 1}]}>
                        <View style={{flex: 10, alignItems: "center", paddingHorizontal: scale(10)}}>
                            <Image source={require('../../../assets/location-pin-marker.png')} style={styles.image} />
                        </View>
                        <View style={{flex: 2, paddingHorizontal: scale(20), alignItems: 'center'}}>
                            <BoldText title='Real-Time Location Tracking' size={18} color={theme.neutral.main} />
                        </View>
                    </View>
                    <View style={[{marginTop: scale(20), flex: 1}]}>
                        <View style={{flex: 10, alignItems: "center", paddingHorizontal: scale(10)}}>
                            <Image source={require('../../../assets/maps-location.png')} style={styles.image} />
                        </View>
                        <View style={{flex: 2, paddingHorizontal: scale(20), alignItems: 'center'}}>
                            <BoldText title='Dynamic Map Interaction' size={18} color={theme.neutral.main} />
                        </View>
                    </View>
                    <View style={[{marginTop: scale(20), flex: 1}]}>
                        <View style={{flex: 10, alignItems: "center", paddingHorizontal: scale(10)}}>
                            <Image source={require('../../../assets/pin.png')} style={styles.image} />
                        </View>
                        <View style={{flex: 2, paddingHorizontal: scale(20), alignItems: 'center'}}>
                            <BoldText title='Local Data Integration' size={18} color={theme.neutral.main} />
                        </View>
                    </View>
                </Swiper>
                <View style={styles.indicatorContainer}>
                    <View style={[currentIndex === 0 ? styles.activeDot : styles.inActiveDot]} />
                    <View style={currentIndex === 1 ? styles.activeDot : styles.inActiveDot} />
                    <View style={currentIndex === 2 ? styles.activeDot : styles.inActiveDot} />
                </View>
            </View>
            <View style = {{flex: 2, paddingHorizontal: scale(20)}}>
                <View style={{marginTop: 'auto'}}>
                    {currentIndex < 2 ? (
                        <Button title="Next" onPress={nextSlide} rippleColor="#fff" />
                    ) : (
                        <Button title="Proceed" onPress={()=>dispatch(toggleLoggedIn())} />
                    )}
                </View>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    logo: {
        height: scale(40),
        width: scale(135),
        // resizeMode: "contain"
    },
    container: {
        // backgroundColor: colors.light,
        flex: 1,
        paddingBottom: 10
    },
    skipBtn: {
        alignSelf: 'flex-end',
        margin: 10,
    },
    wrapper: {
        height: 'auto',
    },
    imgContainer: {
        height: '100%',
        width: '100%',
    },
    image: {
        height: '100%',
        width: '100%',
        // alignSelf: 'center',
        resizeMode: "contain"
    },
    slide1: {
        alignItems: 'center',
    },
    slide2: {
      alignItems: 'center',
    },
    slide3: {
      alignItems: 'center',
    },
    indicatorContainer: {
        flexDirection: "row",
        width: scale(52),
        justifyContent: "space-between",
        marginVertical: scale(10),
        marginLeft: scale(20)
    },
    inActiveDot: {
        height: scale(6),
        width: scale(6),
        backgroundColor: "#E1E1E1",
        borderRadius: scale(3),
    },
    activeDot: {
        height: scale(6),
        width: scale(30),
        backgroundColor: "#d40b4c",
        borderRadius: scale(3),
    },
})

export default Onboarding;
