import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
// import { colors } from '../../Styles/Styles'
import scale from '../../utils/scale';
import { RegularText, MediumText } from '../Typography/Typography';
import CONSTANTS from '../../utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

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
    /** transaction amount */
    amount?: string,
    /** whether transaction is credit or debit */
    credit?: boolean,
}
// const {theme} = CONSTANTS;
const TransactionItem: React.FC<ListProps> = (props) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    return (
        <Pressable style={[styles.listItem, {borderColor: props.borderColor ?? theme.light[400]}]} onPress={props.onPress} android_ripple={{color: props.rippleColor ?? theme.light[400]}}>
            <View style={styles.content}>
                {props.icon ? (
                    <View style={{flex: 2, alignItems: 'flex-start'}}>
                        {props.icon}
                    </View>
                ) : (null)}
                <View style={{flex: 8}}>
                    <MediumText size={14} title={props.title} color={props.textColor ?? theme.dark.main} />
                    {props.subtitle ? (
                        <RegularText size={12} title={props.subtitle} color={theme.neutral.main} />
                    ) : (null)}
                </View>
                {/* {props.icon ? ( */}
                <View style={{alignSelf: 'flex-end', justifyContent: "center", height: "100%"}}>
                    <MediumText size={14} title={props.credit && props.amount ? `+₦${props.amount}` : `-₦${props.amount}`} color={props.credit ? theme.success.main : theme.neutral.main} />
                </View>
                {/* ) : (null)} */}
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    listItem: {
        // borderBottomColor: CONSTANTS.theme.light.dark,
        borderWidth: 1,
        borderStyle: "solid",
        padding: scale(10),
        borderRadius: scale(12),
        marginTop: scale(10),
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: scale(10),
        alignItems: 'center',
    }
})

export default TransactionItem
