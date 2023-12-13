import React, { FC, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, FlatList, Pressable, ViewStyle, TouchableOpacity, Image} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { RegularText, MediumText, BoldText} from '../Typography/Typography';
import { Button } from '../Buttons/Button';
import Input from './TextInput';
import CONSTANTS from '../../utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import scale from '../../utils/scale';
import ListItem from '../ListItem/ListItem';
import Ionicons from '@expo/vector-icons/Ionicons';
import { isLoading } from 'expo-font';
import TextInput from './TextInput';

interface Props {
    store?: any;
    /**list of items */
    list?: Array<any>;
    /**title of popup */
    title: string;
    /** title for confirm button */
    buttonTitle?: string;
    /**callback when an item on list is clicked */
    onSelectItem?: (obj: any)=> any;
    /** value to display on select item */
    value?: string,
    /** full height of popup no mtter length of content*/
    fullHeight?: boolean;
    /**key to display list item name */
    listTitleKey?: string;
    /**optional object key to display subtitle */
    subTitleKey?: string;
    /**whether to display content horizontally */
    grid?: boolean;
    /** loading indicator */
    // loading?: boolean;
    /** optimize sheet presentation */
    optimize?: boolean;
    /** color of select box */
    color?: string;
    /** text color of select box */
    textColor?: string;
    /** style of select box */
    style?: ViewStyle;
    /** custom button component to render at bottom of list */
    customButton?: React.ReactNode;
    /** custom Controller component to toggle select sheet */
    customController?: React.ReactNode;
    /** sheet title */
    sheetTitle?: string;
    /** color of dropdown icon, light/dark */
    iconColor?: 'light' | 'dark';
    searchable?: boolean;
}

const {DEVICE_HEIGHT} = CONSTANTS;
const SelectSheet: FC<Props> = (props: Props)=> {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const [list, setList]: any = useState([]);
    const [searchMode, toggleSearchMode]: any = useState(false);
    const Ref = useRef<ActionSheetRef>(null);

    useEffect(() => {
        setList(props.list);
    }, [props.list])

    const [showContent, toggleContent] = useState(false);
    const toggleContentDisplay = ()=> {
        setTimeout(() => {
            toggleContent(!showContent);
        }, 100);
    }

    const toggleSheet = ()=> {
        // console.log(Ref)
        !Ref.current?.isOpen() ? Ref.current?.show() : Ref.current?.hide();  
    }

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null) //track selected item locally
    const handleSelect = (value: any, index: number)=> {
        console.log(index)
        // Ref.current?.hide();
        setSelectedIndex(index);
        //call this if you want a click on the item to close sheet immediately
        complete(value);
    }

    // complete selection
    const complete = (value: any)=> {
        // const val = list[selectedIndex as number];
        props.onSelectItem ? props.onSelectItem(value) : null;
        toggleSheet();
    }

    const renderItem = (obj: any)=> {
        const item = obj.item;
        const index = obj.index;
        return (
            <View key={index} style={{marginVertical: scale(5)}}>
                <TouchableOpacity style={{
                        borderBottomWidth: 1, 
                        borderBottomColor: theme.neutral[100], 
                        paddingVertical: scale(10), 
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                    onPress={()=> handleSelect(item, index)}>
                    {item.image_url || item.image ? (
                        <View style={{flex: 2}}>
                            <Image source={{uri: item.image_url || item.image}} style={styles.itemIcon} />
                        </View>
                    ) : null}
                    <View style={{flex: 10}}>
                        <MediumText 
                            size={14}
                            transform="capitalize"
                            title={props.listTitleKey ? item[props.listTitleKey] : item}
                            color={theme.dark}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const search = (val: string)=> {
        const key = props.listTitleKey ? props.listTitleKey : null;
        if (val) {
            let subList: any = list;
            subList = subList.filter((item: any) => key ? item[key].toLowerCase().includes(val.toLowerCase()) : item.toLowerCase().includes(val.toLowerCase()))
            setList(subList);
        }
        else {
            setList(props.list)
        }
    
    }

    // render() {
    return (
        <>
        {!props.customController ? (
            <Pressable {...props.style} style={{flexDirection: "row", height: scale(55), backgroundColor: props.color ?? theme.neutral[100], borderRadius: scale(20), paddingVertical: scale(6), paddingHorizontal: scale(15), alignItems: "center"}} onPress={toggleSheet}>
                {props.value ? (
                    <View>
                        <View>
                            <MediumText title={props.title ?? ""} color={props.textColor ?? theme.primary.main} size={12} />
                        </View>
                        <RegularText transform="capitalize" title={props.value ?? ""} color={props.textColor ?? theme.dark} size={14} />
                    </View>
                ): (
                    <RegularText title={props.title} color={props.textColor ?? theme.neutral.main} size={14} />  
                )}
                <View style={{marginLeft: 'auto'}}>
                    <Ionicons name="chevron-down" size={scale(20)} color={theme.neutral.main} />
                </View>
            </Pressable>
        ) : (
            <Pressable onPress={toggleSheet}>
                {props.customController}
            </Pressable>
        )}
            <ActionSheet ref={Ref}
                drawUnderStatusBar = {props.fullHeight ? true : false}
                closeOnPressBack
                statusBarTranslucent={true}
                gestureEnabled
                onOpen = {toggleContentDisplay}
                openAnimationConfig={{bounciness: 0}}
                containerStyle={{
                    borderRadius: 0,
                    height: props.fullHeight ? "110%" : "auto",
                    marginTop: props.fullHeight ? scale(-10) : undefined
                }}
                keyboardHandlerEnabled={false}
            >
                <View style = {{height: 'auto', backgroundColor: theme.light.main}}>
                    <View style={{paddingHorizontal: scale(10), paddingTop: scale(10), flexDirection: "row", justifyContent: "center"}}>
                        <View>
                            <BoldText title={props.sheetTitle ?? ""} size={16} color={theme.neutral.main} />
                        </View>
                        <Pressable style={{position: "absolute", right: scale(10), alignSelf: "flex-end"}} onPress={toggleSheet}>
                            {/* <CloseIcon /> */}
                        </Pressable>
                    </View>
                    {props.searchable ? (
                        <View style={{paddingHorizontal: scale(10), marginTop: scale(10)}}>
                            <TextInput
                                useSystemKeyboard
                                onChangeText = {search}
                                placeholder="Type  to search" 
                                // style={{flex: 8}} 
                            />
                        </View>
                    ) : null}
                    <View style={{paddingHorizontal: scale(10)}}>
                        <FlatList 
                            showsVerticalScrollIndicator={false}
                            style={{marginBottom: scale(20)}}
                            contentContainerStyle={{flexWrap: props.grid ? 'wrap' : 'nowrap', flexDirection: props.grid ? 'row' : 'column', paddingBottom: scale(50), paddingTop: scale(0)}}
                            data={list}
                            renderItem={renderItem}
                            // keyExtractor={(item: any) => item.id}
                            ListEmptyComponent = {()=> (
                                <View style={{height: DEVICE_HEIGHT / 2}}>
                                    {!isLoading ? (
                                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
                                            <MediumText size={16} title="No Data" color={theme.neutral.main} textAlign='center' />
                                        </View>
                                    ) : null}
                                </View>
                            )}
                        />
                    </View>
                </View>
                {/* <View style={{position: "absolute", bottom: scale(20), width: "100%", paddingHorizontal: scale(10)}}>
                    <Button title={props.buttonTitle ?? "Ok"} onPress={complete} disabled={!selectedIndex && selectedIndex !== 0} />
                </View> */}
            </ActionSheet>
        </>
    )
    // }
}

const styles = StyleSheet.create({
    datePicker: {
        backgroundColor: 'white',
        alignItems: 'center'
    },
    listStyle : {
        padding: 10,
        borderBottomWidth: 1,
        // borderBottomColor: theme.light.main,
    },
    gridStyle: {
        padding: 10,
        borderBottomWidth: 1,
        // borderBottomColor: theme.light[400],
        width: '20%',
    },
    itemIcon: {
        height: scale(30),
        width: scale(30),
        borderRadius: scale(8),
        resizeMode: "contain"
    }
})

export default SelectSheet;
