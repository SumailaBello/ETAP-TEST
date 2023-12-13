import React, { Component } from 'react';
import { View, Modal, StyleSheet, Dimensions, Pressable, StatusBar } from 'react-native';
import { Button } from '../Buttons/Button';
import {RegularText, BoldText, MediumText} from '../Typography/Typography';
// import CONSTANTS from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { confirmationFunction, setConfirmationFunction } from '../../utils/utils';
import { ConfirmConfig } from '../../utils/types';
import { toggleConfirmation } from '../../store/modalSlice';
import scale from '../../utils/scale';

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const ConfirmationModal = () => {
    //GLOBAL STATE
    const {theme } = useSelector((state: RootState) => state.appSetting);
    const {confirmationVisible, confirmation} = useSelector((state: RootState) => state.modalSlice);
    // console.log(confirmation)
    const dispatch = useDispatch();

    const proceed = ()=> {
        // props.store.positiveModalCallback(props.store.arg1, props.store.arg2);
        // props.store.resetModal();
        confirmationFunction ? confirmationFunction() : null;
        const confirmObj: ConfirmConfig = {
            title: '',
            message: '',
        }
        dispatch(toggleConfirmation(confirmObj));
    }

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={confirmationVisible}
                // visible={true}
                onRequestClose={() => {
                    // this.props.store.setModalVisible(false);
                    setConfirmationFunction(null);
                }}
                hardwareAccelerated = {true}
                // presentationStyle='overFullScreen'
                statusBarTranslucent
            >
                <Pressable style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <BoldText size={20} title={confirmation.title || 'Confirmation'} />
                        <View style={{marginTop: scale(16)}}>
                            <MediumText size={16} title={confirmation.message || 'Do you want to proceed?'} lines={10} color={theme.neutral.main} />
                        </View>
                        <View style={{flexDirection: 'row', marginTop: scale(16)}}>
                            <View style={{width: '48%', marginRight: scale(5)}}>
                                <Button outline title="Cancel" color={theme.neutral.main} style = {[ {width: '50%', marginRight: 5}]}
                                    textColor={theme.neutral.main} 
                                    onPress = {()=> {
                                        const confirmObj: ConfirmConfig = {
                                            title: '',
                                            message: '',
                                        }
                                        dispatch(toggleConfirmation(confirmObj));
                                    }} 
                                />
                            </View>
                            <View style={{width: '48%', marginLeft: scale(5)}}>
                                <Button title="Proceed" 
                                    color={ confirmation.mode === 'danger' ? theme.danger.main : theme.primary.main} 
                                    rippleColor={theme.light.main} 
                                    // style = {[{width: '50%', marginLeft: 5}]} 
                                    onPress = {proceed} 
                                    textColor={theme.light.main} 
                                />
                            </View>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    //   marginTop: 22,
      height: screenHeight,
      width: screenWidth,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalView: {
        // margin: 10,
        backgroundColor: "white",
        borderRadius: scale(20),
        paddingHorizontal: scale(16),
        paddingVertical: scale(16),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '85%'
    },
  });

export default ConfirmationModal
