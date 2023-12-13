import { NavigationProp } from '@react-navigation/native';
import { AxiosRequestConfig } from 'axios';
import constants from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';

export const validateEmail = (email: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

export const validatePhone = (number: string) => {
  return number.startsWith('234') && number.length === 13
};

export const errorHandler = (error: any)=> {
  const obj = {
    title: "Error",
    message: error?.error ? error?.error[0] : error?.message || error?.msg || 'An error occured'
  }
  return obj
}

// handles success response and displays any necessary message to user
export const successHandler = (res: any)=> {
  const obj = {
    title: "Done",
    message: res?.message || "Action successful"
  }
  return obj
}

/** this function simply extracts data from an api response */
export const extractData = (res: any)=> {
  return res.data.data
}

// global navigation fuction to navigate outside screen or app
export const navigate = (navProps: NavigationProp<any, any>, route: string, params?: any)=> {
  navProps.navigate(route, params);
}

/** holds global confirmation function */
export let confirmationFunction : Function | null; 

/** sets the current value for global confirmation function */
export const setConfirmationFunction = (func: Function | null)=>  confirmationFunction = func;

/** save value to secure store */
export const saveValue = async (key: string, value: string)=> {
  await SecureStore.setItemAsync(key, value);
}

/** get value for a key */
export const getValueFor = async (key: string)=> {
  try {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    } else {
      console.log('Value not found')
    }
  } 
  catch (err) {
    console.log(err);
  }
}

export const copyToClipboard = async (value: string) => {
  await Clipboard.setStringAsync(value);
  // Toast.show('Copied to clipboard.', {
  //   duration: Toast.durations.LONG,
  // });
}

export const showToast = async (message: string)=> {
  Toast.show(message);
}
