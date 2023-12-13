import React, {useState, useEffect, useRef, useCallback} from 'react';
import { View, AppState, PanResponder, Keyboard, DeviceEventEmitter } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoggedIn } from '../../store/appSettings';
import { RootState } from '../../store/store';
import { AlertConfig } from '../../utils/types';
import { toggleAlert } from '../../store/modalSlice';

// interface Props {
//   store?: any,
//   children?: React.PropsWithChildren
// }

const InActivity = (props: any) => {
    const {isLoggedIn, isAppReady, batterySaver} = useSelector((state: RootState) => state.appSetting);
    const {isLoading} = useSelector((state: RootState) => state.modalSlice);
    const dispatch = useDispatch();
    const backgroundDate : any = useRef(null);
    const timerId = useRef<any>(false);
    const warningTimerId = useRef<any>(false);

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    // removes inactivity tier incase it gets turned off while it is already runing
    useEffect(() => {
        if (!batterySaver) {
            clearTimeout(timerId.current);
            clearTimeout(warningTimerId.current);
        }
    }, [batterySaver])

    const panResponder = useRef(
        PanResponder.create({
        onStartShouldSetPanResponder: () => {
            console.log("touched");
            resetInactivityTimeout();
            return true
        },
        onStartShouldSetPanResponderCapture: () => { 
            resetInactivityTimeout();
            console.log("touched");
            return false
        },
        })
    ).current;

    const resetInactivityTimeout = useCallback(() => {
        if(batterySaver) {
            console.log("Reset timer")
            clearTimeout(timerId.current);
            clearTimeout(warningTimerId.current);
            timerId.current = setTimeout(() => {
                console.log("timeout");
                DeviceEventEmitter.emit('disableTracking');
                // }, 3000000);
            }, 300000);
            warningTimerId.current = setTimeout(() => {
                console.log("timeout");
                const alert: AlertConfig = {
                    title: 'Battery Saver',
                    message: 'Location tracking will be automatically disabled in 20 seconds to save battery'
                }
                dispatch(toggleAlert(alert));
            }, 280000);
        }
    }, [batterySaver]);

    // key board event
    useEffect(()=> {
        Keyboard.addListener("keyboardDidShow", resetInactivityTimeout);
        Keyboard.addListener("keyboardDidHide", resetInactivityTimeout);
        return ()=> {
        Keyboard.removeAllListeners("KeyboardDidShow");
        Keyboard.removeAllListeners("KeyboardDidHide");
        }
    }, [])


    //reset inactivity timeout. Runs whenever there is user activity
    useEffect(() => {
        resetInactivityTimeout();
    }, [resetInactivityTimeout]);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === "active" && batterySaver
        ) {
            const newDate = new Date();
            // setForegroundDate(newDate);
            // console.log("App has come to the foreground!");
            // console.log(backgroundDate);
            const duration = calculateBackgroundTime(newDate, backgroundDate.current);
            console.log(duration);
            if (duration >= 5) {
                DeviceEventEmitter.emit('disableTracking');
            }
        }
        else {
            backgroundDate.current = new Date();
            // console.log("App has gone to the background!");
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        // console.log("AppState", appState.current);
        });

        return () => {
        subscription.remove();
        };
    }, []);

        // calculate amount of time in minutes app spent in background
        const calculateBackgroundTime = (date2: Date, date1: Date)=> {
            let diff =(date2.getTime() - date1.getTime()) / 1000;
            diff /= 60;
            return Math.abs(Math.round(diff));
        }

    return (
        <View style={{flex:1}}
            {...panResponder.panHandlers}
        >
            {props.children}
        </View>
        )
}

export default InActivity