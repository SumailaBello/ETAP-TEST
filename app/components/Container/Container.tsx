import React from 'react';
import { Pressable, SafeAreaView, ViewProps, View, StatusBar} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
// import { colors } from '../../Styles/Styles';
import CONSTANTS from '../../utils/constants';
import scale from '../../utils/scale';

// const {theme} = CONSTANTS;
const Container: React.FC<ViewProps> = (props: ViewProps) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const {IS_IOS} = CONSTANTS;

    return (
        <View {...props} style = {[{flex: 1, backgroundColor: theme.light.main, padding: scale(20)}, props.style]} />
    )
}

export default Container;
