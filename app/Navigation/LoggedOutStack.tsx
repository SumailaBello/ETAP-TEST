import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Onboarding from '../screens/Onboading/Onboarding';
import CONSTANTS from '../utils/constants';
import IconButton from '../components/Buttons/IconButton';
import scale from '../utils/scale';
import { View } from 'react-native';
// import PhoneVerify from '../screens/VerifyOtp/PhoneVerify';
// import VerifyPhoneOtp from '../screens/VerifyOtp/VerifyPhoneOtp';

const Stack = createStackNavigator();
const LoggedOutStack = () => {
    const {IS_ANDROID, IS_IOS} = CONSTANTS;
    const Transition = IS_ANDROID ? TransitionPresets.FadeFromBottomAndroid : TransitionPresets.SlideFromRightIOS;
    
    return (
        <Stack.Navigator initialRouteName = "Onboarding" screenOptions={({ navigation }: any) => ({
            headerStyle: {
                backgroundColor: 'white',
                elevation: 0,
            },
            ...Transition,
            // header: ()=> (null),
            headerLeftContainerStyle: {
                paddingBottom: scale(10),
            },
            headerTitle: "",
            // presentation: 'transparentModal', 
            contentStyle: { backgroundColor: 'white'},
            })}
        >
            {/* available screens for logged out users */}
            <Stack.Screen name="Onboarding" component={Onboarding as React.FC} 
                options={{
                    header: ()=> null
                }}
            />
        </Stack.Navigator>
    )
}

export default LoggedOutStack
