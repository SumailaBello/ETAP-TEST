import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useEffect, useRef } from 'react'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet'
import Button from '../../components/Buttons/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import scale from '../../utils/scale';
import IconButton from '../../components/Buttons/IconButton';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { RegularText } from '../../components/Typography/Typography';
import SelectSheet from '../../components/Inputs/SelectSheet';
import * as Location from 'expo-location';
import { NavigationProp } from '@react-navigation/native';

interface Props {
    showMap?: boolean,
    isWatching?: boolean,
    onStopPress?: ()=> void,
    onPlayPress?: ()=> void,
    onSelectAccuracy?: (item: any)=> void,
    onSelectFrequency?: (item: any)=> void,
    accuracyValue?: string,
    navigation?: NavigationProp<any, any>,
    frequencyValue?: string,
    onPressCenter?: ()=> void,
}

const ControlSheet: FC<Props> = ({showMap, isWatching, onStopPress, onPlayPress, onSelectAccuracy, onSelectFrequency, accuracyValue, navigation, frequencyValue, onPressCenter}) => {
    //GLOBAL STATE
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const actionSheetRef: any = useRef<ActionSheetRef>(null);

    useEffect(() => {
        if(showMap) {
            actionSheetRef.current.show();
        }
    }, [showMap])
    
    const accuracy = [
        {
          title: 'Navigation',
          value: Location.LocationAccuracy.BestForNavigation,
        },
        {
          title: 'Highest',
          value: Location.LocationAccuracy.Highest,
        },
        {
          title: 'High',
          value: Location.LocationAccuracy.High,
        },
        {
          title: 'Balanced',
          value: Location.LocationAccuracy.Balanced,
        },
        {
          title: 'Low',
          value: Location.LocationAccuracy.Low,
        },
        {
          title: 'Lowest',
          value: Location.LocationAccuracy.Lowest,
        }
    ]

    const frequency = [
        {
          title: 'Fast',
          value: 1000,
        },
        {
          title: 'Medium',
          value: 4000,
        },
        {
          title: 'Slow',
          value: 10000,
        },
    ]
    
    return (
        <ActionSheet closable={false} isModal={false} statusBarTranslucent drawUnderStatusBar backgroundInteractionEnabled openAnimationConfig={{bounciness: 0}}
            ref={actionSheetRef} gestureEnabled containerStyle={{minHeight: '25%'}}>
            <View style={styles.controlContainer}>
                <View style={{alignItems: 'center'}}>
                    {isWatching ? (
                        <IconButton onPress={onStopPress}
                            icon={<MaterialCommunityIcons name='stop' size={scale(25)} color={theme.danger.main} />} 
                        />
                    ) : (
                        <IconButton onPress={onPlayPress}
                            icon={<MaterialCommunityIcons name='play' size={scale(25)} />} 
                        />
                    )}
                    <View style={{marginTop: scale(5)}}>
                        <RegularText color={theme.neutral.main} title={isWatching ? 'Tracking location' : 'Resume tracking'} size={14} />
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{marginRight: scale(10)}}>  
                        <IconButton icon={<MaterialCommunityIcons name="cog" size={scale(25)} />} 
                            onPress={()=> navigation?.navigate('Settings')}
                        />
                        {/* <View style={{marginTop: scale(5)}}>
                            <RegularText color={theme.neutral.main} title={'Settings'} size={14} />
                        </View> */}
                    </View>
                    <View>
                        <IconButton onPress ={onPressCenter}
                            icon={<MaterialCommunityIcons name="crosshairs" 
                            color={theme.primary.main} size={25} />} 
                            backgroundColor={theme.light[100]} />
                        {/* <View>
                            <RegularText color={theme.neutral.main} title={'Settings'} size={14} />
                        </View> */}
                    </View>
                </View>
            </View>
            {/* accuracy control */}
            <View style={{padding: scale(10)}}>
                <SelectSheet title='Accuracy' value={accuracyValue} sheetTitle='Select Accuracy' 
                list={accuracy} 
                listTitleKey='title' onSelectItem={onSelectAccuracy} />
            </View>
            {/* frequency control */}
            <View style={{padding: scale(10)}}>
                <SelectSheet title='Frequency' value={frequencyValue} sheetTitle='Set update frequency' 
                list={frequency} 
                listTitleKey='title' onSelectItem={onSelectFrequency} />
            </View>
        </ActionSheet>
    )
}

const styles = StyleSheet.create({
    controlContainer: {
        flexDirection: 'row',
        padding: scale(10),
        justifyContent: 'space-between',
    }
})

export default ControlSheet