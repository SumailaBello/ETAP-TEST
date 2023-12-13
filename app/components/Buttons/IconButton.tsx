import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import scale from '../../utils/scale';
import CONSTANTS from '../../utils/constants';

interface buttonProps {
    // title?: string,
    /** function executed on press */
    onPress?: ()=> void,
    icon: React.ReactNode,
    /**optional style for icon parent component like margin and backgroundColor */
    iconParentStyle?: Object,
    disabled?: boolean,
    rippleColor?: string,
    /**whether to render circular indicator badge */
    badge?: boolean,
    /**badge background color */
    badgeColor?: string,
    /**background color of icon button */
    backgroundColor?: string,
}

// const {theme} = CONSTANTS;
export const IconButton: React.FC<buttonProps> = (props: buttonProps) =>  {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const {IS_ANDROID, IS_IOS} = CONSTANTS;
    return (
        <Pressable android_ripple={{color: props.rippleColor ?? theme.light[100]}} onPress={props.onPress} style={[styles.btn, {backgroundColor: props.backgroundColor ? props.backgroundColor : 'transparent', opacity: props.disabled ? 0.5 : 1, borderColor: theme.neutral[200]}]} disabled={props.disabled}>
            <View style={props.iconParentStyle ? props.iconParentStyle : styles.defaultIconParentStyle}>
                {props.icon}
                {props.badge ? (
                    <View style = {[styles.badge, {backgroundColor: props.badgeColor ?? theme.primary.main}]} />
                ) : (null)}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    // defaultBtnStyle: {
    //     width: 'auto',
    // },
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: scale(5),
        // margin: defaultMargin,
        borderRadius: scale(8),
        width: scale(40),
        height: scale(40),
        borderWidth: scale(1),
    },
    defaultIconParentStyle: {
        backgroundColor: 'transparent'
    },
    badge: {
        height: 10,
        width: 10,
        borderRadius: 5,
        position: 'absolute',
        left: '65%',
        top: -5
    }
});

export default IconButton;
