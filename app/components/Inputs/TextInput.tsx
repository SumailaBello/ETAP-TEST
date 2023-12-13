import React, { useRef, Ref, useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardType, TextInput, Pressable, Keyboard, ViewStyle } from 'react-native';
// import {colors} from '../../Styles/Styles';
import scale from '../../utils/scale';
import { MediumText, RegularText } from '../Typography/Typography';
import CONSTANTS from '../../utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface Props {
    /** label string */
    label?: string,
    /** show label */
    showLabel?: boolean,
    /** style object to customise input parent item. This will override default styling for error, valid and required states */
    style? : Object,
    /**react component to be used as icon */
    icon?: React.ReactNode,
    /**icon position whether left or right */
    // iconPosition?: string,
    /**optional style for icon parent component like margin and backgroundColor */
    iconStyle?: Object,
    /**whether input is editable or not */
    disabled?: boolean,
    /**applies default styling for error state */
    error?: boolean,
    /**custom error message */
    errorMessage?: string,
    /**applies default behaviour to highlight required input */
    required?: boolean,
    /**applies default styling for valid state */
    valid?: boolean,
    defaultValue?: any,
    onChangeText?: (value: string)=> void,
    onChange?: (value: any)=> void,
    onFocus?: (focus: boolean) => void,
    keyboardType?: KeyboardType,
    secure?: boolean,
    /**parent style object */
    parentStyle?: ViewStyle,
    value?: any;
    numberOfLines?: number,
    multiline?: boolean;
    placeholder?: string,
    /** alternate label component for input field */
    altLabel?: React.ReactNode,
    /** position of icon */
    iconPosition?: 'right' | 'left',
    /** theme mode */
    themeMode?: "light" | "dark",
    /** icon flex size */
    iconFlex?: 2 | 3 | 4 | 5,
    useSystemKeyboard: boolean,
    /** max length of input */
    maxLength?: number,
}

/**default margin style style */
// const defaultMargin: number = 2;
// const {theme} = CONSTANTS;

const Input: React.FC<Props> = (props) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const [value, setValue] : any = useState(props.value || props.defaultValue);
    const inputRef: Ref<any> = useRef();
    const [focused, setFocused] = useState(false);
    const [showLabel, setShowLabel] = useState(props.showLabel ?? true);
    // const eventEmitter = new NativeEventEmitter();
    const toggleFocus = (value: boolean)=> {
        setFocused(value);
    }

    const handleFocus = ()=> {
        inputRef.current.focus();
        toggleFocus(true);
        props.onFocus ? props.onFocus(true) : null;
        emitEvent();
    }
    const handleBlur = ()=> {
        toggleFocus(false);
        emitBlurEvent();
        // alert("blur");
    }

    // track change of value locally
    const handleChange = (value: any)=> {
        setValue(value);
        props?.onChangeText ? props.onChangeText(value) : null;
        props.onChange ? props.onChange(value) : null;
    }

    useEffect(() => {
        if(!props.useSystemKeyboard) {
            Keyboard.addListener("keyboardDidShow", handleKeyboard);
            // add Container press listener to blur input when necessary as blur removes focus from input
            // eventEmitter.addListener("containerPress", addContainerPressListener);
        }
        return () => {
            Keyboard.removeAllListeners("keyboardDidShow");
            // eventEmitter.removeAllListeners("containerPress");
        }
    }, [props.useSystemKeyboard])

    const handleKeyboard = ()=> {
        if(!props.useSystemKeyboard) {
            Keyboard.dismiss();
            inputRef?.current?.focus()
        }
    }

    // emits focus event once system keyboard is not in use
    const emitEvent = ()=> {
        if(!props.useSystemKeyboard) {
            // eventEmitter.emit("inputFocus");
        }
    }

    // emits blur event once system keyboard is not in use
    const emitBlurEvent = ()=> {
        if(!props.useSystemKeyboard) {
            // eventEmitter.emit("inputBlur");
        }
    }

    // responds to container press event
    const addContainerPressListener = ()=> {
        inputRef?.current?.blur();
    }

    return (
        <>
            <Pressable onPress = {()=> inputRef.current.focus()} style={[styles.defaultItemStyle, 
                {borderColor: focused ? theme.success.main : theme.neutral[100], backgroundColor: theme.neutral[100], opacity: props.disabled ? 0.9 : undefined}]}>
                {showLabel ? (
                    <MediumText title={props.label ?? ""} size={12} color={theme.primary.main} />
                ) : null}
                <View style={{flex: 1, flexDirection: "row"}}>
                    {props.icon && props.iconPosition === "left" ? (
                        <View style={{flex: props.iconFlex ?? 2, justifyContent: "center", alignItems: "flex-start"}}>
                            {props.icon}
                        </View>
                    ) : null}
                    <View style={{flex: 10}}>
                        <TextInput maxLength={props.maxLength ?? undefined} showSoftInputOnFocus={props.useSystemKeyboard ?? true} ref={inputRef} onFocus={handleFocus} onBlur={handleBlur} style={{color: theme.dark, height: '100%'}} editable = {!props.disabled} defaultValue ={props.defaultValue} onChangeText={handleChange} onChange={props.onChange} keyboardType={props.keyboardType} secureTextEntry = {props.secure} value={props.value} multiline = {props.multiline ? props.multiline : false} placeholder = {props.placeholder} placeholderTextColor={theme.neutral[200]} />
                    </View>
                    {props.icon && props.iconPosition === "right" ? (
                        <View style={{flex: props.iconFlex ?? 2, justifyContent: "center", alignItems: "flex-end", zIndex: 10000}}>
                            {props.icon}
                        </View>
                    ) : null}
                </View>
            </Pressable>
            {props.error ? (
                <View style={{marginTop: scale(-18), marginLeft: scale(3), paddingBottom: scale(4)}}>
                    <RegularText title={ props.errorMessage ??  props.label + " is invalid"} color={theme.danger.main} size={10} />
                </View>
            ) : null}
        </>
    );
}

const styles = StyleSheet.create({
    defaultItemStyle: {
        paddingHorizontal: 15,
        borderRadius: scale(20),
        paddingVertical: scale(5),
        // backgroundColor: theme.light.light.main,
        borderWidth: 1,
        marginBottom: 20,
        height: scale(55),
        // flexDirection: 'row'
        // borderColor: theme.light.medium,
    },
    errorItemStyle: {
        paddingHorizontal: 15,
        borderRadius: scale(8),
        paddingVertical: scale(5),
        borderWidth: 1,
        // borderColor: theme.light.danger.main,
        // backgroundColor: theme.light.medium,
        // borderWidth: 2,
    },
    focusItemStyle: {
        paddingHorizontal: 15,
        borderRadius: scale(8),
        paddingVertical: scale(5),
        borderWidth: 1,
        // borderColor: theme.light.primary.main,
        // backgroundColor: theme.light.secondary,
        // borderWidth: 2,
    },
    defaultLabelStyle: {
        // color: theme.light.primary.main,
        marginLeft: 6,
        // marginTop: -12,
    },
    iconStyle: {
        position: "absolute",
        left: '90%',
        // top: scale(15),
        zIndex: 1000,
        height: scale(50),
        padding: 10,
        justifyContent: 'center'
    },
});

export default Input;
