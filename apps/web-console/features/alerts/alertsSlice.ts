// src/features/alerts/alertsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Alert {
  message: string;
  severity: "error" | "warning" | "info" | "success";
}

interface AlertsState {
  alerts: Alert[];
}

const initialState: AlertsState = {
  alerts: [],
};

export const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<Alert>) => {
      state.alerts.push(action.payload);
    },
    removeAlert: (state) => {
      state.alerts.shift();
    },
  },
});

export const { showAlert, removeAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
