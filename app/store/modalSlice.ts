import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AlertConfig, ModalSettings, ConfirmConfig } from '../utils/types';
import CONSTANTS from '../utils/constants';
import { createSelector } from 'reselect';

const {theme} = CONSTANTS;

const initialState: ModalSettings = {

  isLoading: false,
  alert: {
    title: 'Alert',
    message: '',
  },
  alertVisible: false,
  confirmationVisible: false,
  confirmation: {
    title: 'Confirm',
    message: 'Do you want to proceed?',
    mode: 'default',
  },
}

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    /**toggles application loading state */
    toggleLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    /**toggles application wide alert modal with */
    toggleAlert: (state, action: PayloadAction<AlertConfig>) => {
      state.alertVisible = !state.alertVisible;
      if(state.alertVisible) {
        state.alert.title = action.payload.title ?? 'Alert';
        state.alert.message = action.payload.message ?? '';
      } 
    },

    toggleConfirmation: (state, action: PayloadAction<ConfirmConfig>) => {
      state.confirmationVisible = !state.confirmationVisible;
      if(state.confirmationVisible) {
        state.confirmation.title = action?.payload?.title ?? 'Confirm';
        state.confirmation.message = action?.payload?.message ?? 'Do you want to proceed?';
        state.confirmation.mode = action?.payload?.mode ?? 'default';
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  toggleLoading,
  toggleAlert, 
  toggleConfirmation,
} = modalSlice.actions

export default modalSlice.reducer