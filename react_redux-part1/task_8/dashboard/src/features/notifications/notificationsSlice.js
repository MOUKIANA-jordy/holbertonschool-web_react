import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

import {
  getLatestNotification,
} from '../../utils/utils';

const API_BASE_URL = 'http://localhost:5173';

const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
};

const initialState = {
  notifications: [],
  displayDrawer: true,
};

/**
 * Fetches notifications from the API and enriches notification 3
 * with the latest notification HTML content.
 */
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await axios.get(
      ENDPOINTS.notifications
    );

    return response.data.map(
      (notification) => {
        if (notification.id !== 3) {
          return notification;
        }

        const updatedNotification = {
          ...notification,
        };

        delete updatedNotification.value;

        return {
          ...updatedNotification,
          html: {
            __html:
              getLatestNotification(),
          },
        };
      }
    );
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,

  reducers: {
    /**
     * Removes a notification from the store after it has been read.
     */
    markNotificationAsRead: (
      state,
      action
    ) => {
      console.log(
        `Notification ${action.payload} has been marked as read`
      );

      state.notifications =
        state.notifications.filter(
          (notification) =>
            notification.id !== action.payload
        );
    },

    /**
     * Opens the notifications drawer.
     */
    showDrawer: (state) => {
      state.displayDrawer = true;
    },

    /**
     * Closes the notifications drawer.
     */
    hideDrawer: (state) => {
      state.displayDrawer = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchNotifications.fulfilled,
      (state, action) => {
        state.notifications =
          action.payload;
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
