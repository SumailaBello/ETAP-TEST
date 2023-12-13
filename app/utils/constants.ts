import {Dimensions, Platform} from 'react-native';
import { Theme } from './types';

const {height, width} = Dimensions.get('window');


const theme: Theme = {
  /**LIGHT MODE PALETTE */
  light: {
    primary: {
      main: "#3F63F6",
      100: "#D8E3FE",
      200: "#B2C6FE",
    },
    success: {
      main: "#15F2C7",
      100: "#F3FDE2",
      200: "#E4FCC6",
    },
    warning: {
      main: "#F9E636",
    },
    danger: {
      main: "#d40b4c",
      100: "#FEEAD2",
      200: "#FED0A5",
    },
    text: {
      main: "#222741",
      lightText: "#75788D",
    },
    light: {
      main: "#FFFFFF",
      100: "#FFFFFF",
    },
    neutral: {
      main: "#808080",
      100: "#F1F1F1",
      200: "#E5E5E5",
    },
    dark: "#0F1225",
  },
  /**DARK MODE PALETTE */
  dark: {
    primary: {
      main: "#3F63F6",
      100: "#D8E3FE",
      200: "#B2C6FE",
    },
    success: {
      main: "#15F2C7",
      100: "#F3FDE2",
      200: "#E4FCC6",
    },
    warning: {
      main: "#F9E636",
    },
    danger: {
      main: "#d40b4c",
      100: "#FEEAD2",
      200: "#FED0A5",
    },
    text: {
      main: "#222741",
      lightText: "#75788D",
    },
    light: {
      main: "#FFFFFF",
      100: "#FFFFFF",
    },
    neutral: {
      main: "#808080",
      100: "#F1F1F1",
      200: "#E5E5E5",
    },
    dark: "#0F1225",
  }
}

export const locationRationale = {
  title: "Location Permission",
  message: "ETAP collects location data to enable us display your location on the map, track your current location and display possible points of interests even when the app is closed or not in use.",
};

const CONSTANTS =  {
  DEVICE_WIDTH: width,
  DEVICE_HEIGHT: height,
  IS_IOS: Platform.OS === 'ios',
  IS_ANDROID: Platform.OS === 'android',
  theme,
};

export default CONSTANTS
