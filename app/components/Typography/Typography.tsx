import React, {FC, useState} from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { fontScale } from '../../utils/scale';
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store';

interface textProps {
    /** title */
    title: string,
    /**Number of lines the text can break into */
    lines?: number,
    /** color of the text */
    color?: string,
    /**texts are centered by default e.g auto, left, right, center, justify*/
    textAlign?: "auto" | "left" | "right" | "center" | "justify",
    /** font size */
    size?: 10 | 11 | 12 | 14 | 16 | 18 | 20 | 24 | 26 | 32 | 37 | 48,
    transform?: 'capitalize' | 'uppercase' | 'lowercase' | 'none',
    extraStyle?: TextStyle,

}

// type definition for block text
interface blockTextProps {
    /**Number of lines the text can break into */
    lines?: number,
    /** color of the text */
    color?: string,
    /**texts are centered by default e.g auto, left, right, center, justify*/
    textAlign?: "auto" | "left" | "right" | "center" | "justify",
    /** font size */
    size?: 10 | 11 | 12 | 14 | 16 | 18 | 20 | 24 | 26 | 32 | 37 | 48,
    children?: any,
    fontFamily?: string,
    style?: TextStyle,
}
// const {theme} = CONSTANTS;

/** weight: 900 */
export const ExtraBoldText: FC<textProps> = props => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const title = props.title;
    const [lines, setLines] = useState(1);
    const handleTextLayout = (event: any)=> {
        setLines(event.nativeEvent.lines.length);
    }
    return (
        <Text style={[
            styles.extraBoldStyle, 
            {color: props.color ? props.color : theme.primary.main, 
                textAlign: props.textAlign, 
                fontSize: props.size ? fontScale(props.size) : fontScale(16),
                textTransform: props.transform ?? undefined,
            }, props.extraStyle]} 
                numberOfLines= {props.lines ? props.lines : lines}
        onTextLayout={handleTextLayout}>{title}</Text>
    );
};
/** weight: 700 */
export const BoldText: FC<textProps> = props => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const title = props.title;
    const [lines, setLines] = useState(1);
    const handleTextLayout = (event: any)=> {
        setLines(event.nativeEvent.lines.length);
    }
    return (
        <Text style={[
            styles.boldStyle, 
            {color: props.color ? props.color : theme.primary.main, 
                textAlign: props.textAlign, 
                fontSize: props.size ? fontScale(props.size) : fontScale(16), textTransform: props.transform ?? undefined}, props.extraStyle]} 
                numberOfLines= {props.lines ? props.lines : lines}
        onTextLayout={handleTextLayout}>{title}</Text>
    );
};

/** weight: 600 */
export const SemiBoldText: FC<textProps> = props => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const title = props.title;
    const [lines, setLines] = useState(1);
    const handleTextLayout = (event: any)=> {
        setLines(event.nativeEvent.lines.length);
    }
    return (
        <Text style={[
            styles.semiBoldStyle, 
            {color: props.color ? props.color : theme.primary.main, 
                textAlign: props.textAlign, 
                fontSize: props.size ? fontScale(props.size) : fontScale(16), 
                textTransform: props.transform ?? undefined}, props.extraStyle]} 
                numberOfLines= {props.lines ? props.lines : lines}
        onTextLayout={handleTextLayout}>{title}</Text>
    );
};

/** weight: 500 */
export const MediumText: FC<textProps> = props => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const title = props.title;
    const [lines, setLines] = useState(1);
    const handleTextLayout = (event: any)=> {
        setLines(event.nativeEvent.lines.length);
    }
    return (
        <Text style={[
                styles.mediumStyle, 
                {color: props.color ? props.color : theme.primary.main, 
                    textAlign: props.textAlign, 
                    fontSize: props.size ? fontScale(props.size) : fontScale(16),
                    textTransform: props.transform ?? undefined
                }, props.extraStyle
            ]} 
            numberOfLines= {props.lines ? props.lines : lines}>{title}</Text>
    );
};
/** weight: 400 */
export const RegularText: FC<textProps> = props => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const title = props.title;
    const [lines, setLines] = useState(1);
    const handleTextLayout = (event: any)=> {
        setLines(event.nativeEvent.lines.length);
    }
    return (
        <Text 
            style={
                [styles.regularStyle, 
                {
                    color: props.color ? props.color : theme.primary.main, 
                    textAlign: props.textAlign, 
                    fontSize: props.size ? fontScale(props.size) : fontScale(16),
                    textTransform: props.transform ?? undefined
                }, props.extraStyle]} 
            numberOfLines= {props.lines ? props.lines : lines}
            onTextLayout={handleTextLayout}>{title}</Text>
    );
};

/** Nestable text component. Used in cases where we need to use string/text component as children  */
export const BlockText: FC<blockTextProps> = props => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const [lines, setLines] = useState(1);
    const handleTextLayout = (event: any)=> {
        setLines(event.nativeEvent.lines.length);
    }
    // const title = props.title;
    return (
        <Text style={[{color: props.color ? props.color : theme.primary.main, textAlign: props.textAlign, fontSize: props.size ? fontScale(props.size) : fontScale(16), fontFamily: props.fontFamily ?? "Poppins-Regular"}]} numberOfLines= {props.lines ? props.lines : lines}
        onTextLayout={handleTextLayout}>{props.children}</Text>
    );
};


const styles = StyleSheet.create({
    extraBoldStyle: {
        // fontSize: scale(20),
        fontFamily: 'Poppins-ExtraBold',
        fontStyle: 'normal',
    },
    boldStyle: {
        // fontSize: scale(20),
        fontFamily: 'Poppins-Bold',
        fontStyle: 'normal',
    },
    semiBoldStyle: {
        // fontSize: scale(20),
        fontFamily: 'Poppins-SemiBold',
        fontStyle: 'normal',
    },
    mediumStyle: {
        // fontSize: scale(20),
        fontFamily: 'Poppins-Medium',
        fontStyle: 'normal',
    },
    regularStyle: {
        // fontSize: scale(20),
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
    },
});
