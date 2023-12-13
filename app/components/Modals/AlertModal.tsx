import React, { useEffect, useRef } from 'react';
import { View, Modal, StyleSheet, Dimensions, Pressable, StatusBar } from 'react-native';
import { Button } from '../Buttons/Button';
// import { IconButton } from '../Buttons/IconButton';
// import globalStyles, {colors} from '../../Styles/Styles';
// import {observer, inject} from 'mobx-react';
import {RegularText, BoldText, MediumText, SemiBoldText} from '../Typography/Typography';
import CONSTANTS from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {toggleAlert}  from '../../store/modalSlice';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import scale from '../../utils/scale';
import { AlertConfig } from '../../utils/types';

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const AlertModal = () => {
  const {theme} = useSelector((state: RootState) => state.appSetting);
  const {alertVisible, alert} = useSelector((state: RootState) => state.modalSlice);
  const dispatch = useDispatch();
  const ref = useRef<ActionSheetRef>();
  useEffect(() => {
    if (alertVisible === true) {
      ref.current?.show();
    }
    else {
      ref.current?.hide();
    }
  }, [alertVisible])
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={alertVisible}
        onRequestClose={() => {
        }}
        hardwareAccelerated = {true}
    >
        <Pressable style={styles.centeredView}>
            <View style={styles.modalView}>
                <BoldText size={20} title={alert.title || "Error"} textAlign="left" color={theme.dark} />
                <RegularText size={14} title={alert.message || ''} lines={10} color={theme.dark} textAlign="center" />
                <View style={{marginTop: 40, width: '100%'}}>
                    <Button title="Ok" color={theme.primary.main} onPress = {
                      ()=> dispatch(toggleAlert({title: '', message: ''}))
                      } 
                      textColor={theme.light.main} />
                </View>
            </View>
        </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
    centeredView: {
    //   flex: 1,
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
        borderRadius: 20,
        paddingHorizontal: 35,
        paddingVertical: 20,
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
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

export default AlertModal;
