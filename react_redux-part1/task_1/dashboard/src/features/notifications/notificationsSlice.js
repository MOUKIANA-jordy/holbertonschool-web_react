import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLatestNotification } from '../../utils/utils';

const API_BASE_URL = 'http://localhost:5173';

const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
};

const initialState = {
  notifications: [],
  displayDrawer: true,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await axios.get(ENDPOINTS.notifications);

    const notifications = response.data.map((notification) => {
      if (notification.id === 3) {
        const { value, ...rest } = notification;

        return {
          ...rest,
          html: {
            __html: getLatestNotification(),
          },
        };
      }

      return notification;
    });

    return notifications;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      console.log(
        `Notification ${action.payload} has been marked as read`
      );

      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },

    showDrawer: (state) => {
      state.displayDrawer = true;
    },

    hideDrawer: (state) => {
      state.displayDrawer = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchNotifications.fulfilled,
      (state, action) => {
        state.notifications = action.payload;
      }
    );
  },
});

export const {
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
