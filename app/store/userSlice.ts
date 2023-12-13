import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserObj } from '../utils/types';
import CONSTANTS from '../utils/constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { setToken } from '../utils/api';

const initialState: UserObj = {
    user: {},
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    /**saves user object to global state used in auth endpoints */
    saveUser: (state, action: PayloadAction<any>) => {
    console.log(action?.payload?.data)
    state.user = action?.payload?.data;
    /** sets token to request config */
    setToken(action?.payload?.data?.auth_token);
    const userObj = JSON.stringify(state.user);
    console.log(userObj)
      /** save the user object to store */
      // AsyncStorage.setItem("user", userObj);
      // AsyncStorage.setItem("token", JSON.stringify(action?.payload?.data?.auth_token))
      SecureStore.setItemAsync("user", userObj);
      SecureStore.setItemAsync("token", JSON.stringify(action?.payload?.data?.auth_token))
    },

    /** update user obj alone without updating token */
    setUserObj: (state, action: PayloadAction<any>) => {
      state.user = action?.payload?.data;
      const userObj = JSON.stringify(state.user);
      /** save the user object to store */
      // AsyncStorage.setItem("user", userObj);
      SecureStore.setItemAsync("user", userObj);
    },

    /** reset user state on logout */
    resetUser: (state)=> {
      state.user = {};
      // AsyncStorage.clear();
      SecureStore.deleteItemAsync('user');
      SecureStore.deleteItemAsync('token');
    },

    /** updates user state object without saving. Useful for value gotten from storage at app startup */
    updateUserState: (state, action: PayloadAction<any>) => {
        /** payload is expected to be an object that contains user key and token key */
        state.user = action?.payload?.user;
        /** sets token to request config */
        setToken(action?.payload?.token);
    }
  },
})

// Action creators are generated for each case reducer function
export const { saveUser, setUserObj, resetUser, updateUserState } = userSlice.actions

export default userSlice.reducer