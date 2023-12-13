import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
// import { colors } from '../../Styles/Styles'
import scale from '../../utils/scale';
import { RegularText, MediumText } from '../Typography/Typography';
import CONSTANTS from '../../utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Ionicons from '@expo/vector-icons/Ionicons';

interface ListProps {
    /** title string */
    title: string,
    subtitle?: string,
    /** style object */
    // style?: Object,
    /** function executed on press */
    onPress?: ()=> void,
    icon?: React.ReactNode,
    /**icon position whether left or right */
    iconPosition?: string,
    /**optional style for icon parent component like margin and backgroundColor */
    iconStyle?: Object,
    disabled?: boolean,
    /**style of button text */
    textStyle?: Object,
    rippleColor?: string,
    /** color of button text to override default color */
    textColor?: string,
    /**vertical padding value to control button height */
    verticalPadding?: number,
    /**control horizontal padding value */
    horizontalPadding?: number,
    loading?: boolean,
    loaderColor?: string,
    /** color of border */
    borderColor?: string,
    clickable?: boolean,
}
// const {theme} = CONSTANTS;
const ListItem: React.FC<ListProps> = (props) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    return (
        <Pressable style={[styles.listItem, {opacity: props.disabled ? 0.6 : undefined, borderColor: props.borderColor ?? theme.neutral[100]}]} onPress={ props.disabled ? null : props.onPress} android_ripple={{color: props.rippleColor ?? theme.light[400]}}>
            <View style={styles.content}>
                {props.icon && props.iconPosition !== 'right' ? (
                    <View style={{flex: 2, }}>
                        {props.icon}
                    </View>
                ) : (null)}
                <View style={{flex: 9, justifyContent: "center"}}>
                    <MediumText size={14} title={props.title} color={props.textColor ?? theme.dark.main} />
                    {props.subtitle ? (
                        <RegularText size={12} title={props.subtitle} />
                    ) : (null)}
                </View>
                {props.icon && props.iconPosition === 'right' ? (
                    <View style={{flex: 2, alignItems: "flex-end", paddingRight: scale(15)}}>
                        {props.icon}
                    </View>
                ) : (null)}
                {props.clickable && props.iconPosition !== 'right' ? (
                    <View style={{flex: 1}}>
                        <Ionicons name="chevron-forward" size={scale(15)} style={{alignItems: 'flex-end'}} color={theme.neutral.main} />
                    </View>
                ) : null}
            </View>
            {/* <MediumText title={props.title} /> */}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    listItem: {
        // borderBottomColor: CONSTANTS.theme.light.dark,
        borderWidth: 1,
        borderStyle: "solid",
        paddingVertical: scale(10),
        borderRadius: scale(8),
        marginBottom: scale(10)
    },
    content: {
        // flex: 1,
        flexDirection: 'row',
        paddingLeft: scale(10),
        alignItems: 'center',
    }
})

export default ListItem
