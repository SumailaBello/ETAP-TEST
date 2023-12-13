import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, ActivityIndicator  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoggedOutStack from '../Navigation/LoggedOutStack';
import LoggedInStack from '../Navigation/LoggedInStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import {toggleLoggedIn, toggleReady}  from '../store/appSettings';
import {updateUserState}  from '../store/userSlice';
import { RootState } from '../store/store';
import * as SecureStore from 'expo-secure-store';
import scale from '../utils/scale';
import InActivity from '../components/InActivity/InActivity';

interface Props {
    store?: any,
}

const MainApp: React.FC<Props> = props => {
    console.log(props);
    const {isLoggedIn, isAppReady} = useSelector((state: RootState) => state.appSetting);
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const dispatch = useDispatch();

    return (
        <>
            {/* {isAppReady ? ( */}
                <>
                    {isLoggedIn ? (
                        <NavigationContainer>
                            <InActivity>
                                <LoggedInStack />
                            </InActivity>
                        </NavigationContainer>
                        ) : ( 
                            <NavigationContainer
                                fallback={<ActivityIndicator size={scale(25)} 
                                color={theme.primary.main} style={{flex: 1}} />}
                            >
                                <LoggedOutStack />
                            </NavigationContainer>
                    )}
                </>
        </>
    );
}

export default MainApp;
