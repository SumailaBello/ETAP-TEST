import React, { useEffect } from 'react';
import { StyleSheet, Animated, ViewStyle} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
// import { colors } from '../../Styles/Styles';
// import CONSTANTS from '../../utils/constants';

interface Props {
    /** whether skeleton loader will be animated or not. It will animate by default */
    animated?: boolean;
    style?: ViewStyle;
}

// const {theme} = CONSTANTS;
const SkeletonLoader: React.FC<Props> = (props) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    let animated = new Animated.Value(0.3);
    const inputRange = [0, 1];
    let outputRange = [0, 1];
    let opacity = animated.interpolate({inputRange, outputRange});

    useEffect(()=>{
        if ( props.animated === true || props.animated === undefined ) {
            animate();
        }
    })
    const animate = ()=> {
        Animated.loop(
          Animated.timing(animated, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
          }),
        ).start();
    }
    return (
        <Animated.View style={[props.style ? props.style : styles.view, {opacity: opacity, backgroundColor: theme.light[100]}]} />
    )
}

export default SkeletonLoader

const styles = StyleSheet.create({
    view: {
        height: 20,
        width: '100%',
        borderRadius: 5,
    }
})
