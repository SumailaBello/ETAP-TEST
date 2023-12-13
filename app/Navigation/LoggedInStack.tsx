import React, { useEffect } from 'react';
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from '@react-navigation/stack';
import { StackScreenProps } from '@react-navigation/stack';
import { Image, StatusBar, StyleSheet, Platform, View } from 'react-native';
import scale, { fontScale } from '../utils/scale';
import type { RootState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import CONSTANTS from '../utils/constants';
import Dashboard from '../screens/Dashboard/Dashboard';
import Settings from '../screens/Settings/Settings';

const Stack = createStackNavigator();
// const LoggedInStack = (stackProps: StackScreenProps<any>) => {
const LoggedInStack = () => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const {IS_ANDROID, IS_IOS} = CONSTANTS;
    const Transition = IS_ANDROID ? TransitionPresets.FadeFromBottomAndroid : TransitionPresets.SlideFromRightIOS;
    const screenOptions: StackNavigationOptions = {
        headerTitleAlign: 'center',
        headerStatusBarHeight: StatusBar.currentHeight,
    }
    
    return (
        <Stack.Navigator initialRouteName = "Dashboard" screenOptions={({ navigation }: any) => ({
            // ...TransitionPresets.FadeFromBottomAndroid,
            ...Transition,
            headerTitleAlign: "center",
            headerTitleStyle: {
                fontFamily: "Poppins-SemiBold",
                paddingBottom: IS_IOS ? scale(30) : undefined,
                fontSize: fontScale(18)
                // marginTop: "auto"
            },
            headerStyle: {
                elevation: 0,
                height: IS_IOS ? scale(80) : undefined,
            },
            headerLeftContainerStyle: {
                paddingBottom: scale(10),
                paddingLeft: IS_IOS ? scale(10) : undefined,
            },
            headerTitleContainerStyle: {paddingTop: scale(20)}
            })}
        >
            {/* available screens for logged in users */}
            <Stack.Screen name="Dashboard" component={Dashboard as React.FC} options={{
                header: ()=> null,
            }} />
            <Stack.Screen name="Settings" component={Settings as React.FC} options={{
                // header: ()=> null,
            }} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        paddingTop: StatusBar.currentHeight, 
        paddingHorizontal: scale(10), 
        paddingBottom: scale(10),
    }
})

export default LoggedInStack

