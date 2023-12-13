import { View, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import scale from '../../utils/scale';
import { ViewStyle } from 'react-native';

interface Props {
    color?: string,
    style?: ViewStyle,
}

const HR: FC<Props> = ({color, style}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    return (
        <View style={[styles.hr, {backgroundColor: color ?? theme.neutral[100]}, style]} />
    )
}

const styles = StyleSheet.create({
    hr: {
        height: scale(1),
    },
})

export default HR