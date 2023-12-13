import React from 'react'
import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
// import { colors } from '../../Styles/Styles';
import scale from '../../utils/scale';
// import CONSTANTS from '../../utils/constants';

interface Props {
    /** toggle radio button */
    active?: boolean;
    /** onPress event */
    onPress?: ()=> void;
    /** manually disable or enable radio button */
    disabled?: boolean;
    /** color to use for active state */
    color?: string;
    /** color to use for inactive state */
    disabledColor?: string;
}
// const {theme} = CONSTANTS;
const RadioButton: React.FC<Props> = ({active, onPress, disabled, color, disabledColor}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    return (
        <TouchableOpacity onPress={onPress} style={{ height: scale(20), width: scale(20), borderWidth: 1, borderColor: active ? color ?? theme.primary.main : disabledColor ?? "#E5E5E5", borderRadius: scale(15), padding: 5 }}>
            <View style={{height: scale(10), width: scale(10), borderRadius: scale(7), backgroundColor: active ? color : theme.light.main}} />
        </TouchableOpacity>
    )
}

export default RadioButton;
