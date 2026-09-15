import axios from 'axios';

import notificationsReducer, {
  fetchNotifications,
  markNotificationAsRead,
} from '../notifications/notificationsSlice';

jest.mock('axios');

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
    loading: false,
  };

  test('Should return the initial state by default', () => {
    const state = notificationsReducer(
      undefined,
      {
        type: undefined,
      }
    );

    expect(state).toEqual({
      notifications: [],
      loading: false,
    });
  });

  test('Should set loading to true when fetchNotifications is pending', () => {
    const state = notificationsReducer(
      initialState,
      fetchNotifications.pending()
    );

    expect(state.loading).toBe(true);
    expect(state.notifications).toEqual([]);
  });

  test('Should set notifications and loading to false when fetchNotifications is fulfilled', () => {
    const notifications = [
      {
        id: 1,
        type: 'default',
        value: 'New course available',
      },
      {
        id: 2,
        type: 'urgent',
        value: 'New resume available',
      },
    ];

    const state = notificationsReducer(
      {
        notifications: [],
        loading: true,
      },
      fetchNotifications.fulfilled(
        notifications,
        '',
        undefined
      )
    );

    expect(state.loading).toBe(false);
    expect(state.notifications).toEqual(
      notifications
    );
  });

  test('Should set loading to false when fetchNotifications is rejected', () => {
    const state = notificationsReducer(
      {
        notifications: [],
        loading: true,
      },
      fetchNotifications.rejected(
        new Error('Request failed'),
        '',
        undefined
      )
    );

    expect(state.loading).toBe(false);
  });

  test('Should fetch notifications successfully', async () => {
    const response = {
      data: [
        {
          id: 1,
          type: 'default',
          value: 'New course available',
        },
        {
          id: 2,
          type: 'urgent',
          value: 'New resume available',
        },
      ],
    };

    axios.get.mockResolvedValue(response);

    const dispatch = jest.fn();

    const result = await fetchNotifications()(
      dispatch,
      () => ({}),
      undefined
    );

    expect(axios.get).toHaveBeenCalled();

    expect(result.type).toBe(
      'notifications/fetchNotifications/fulfilled'
    );
  });

  test('Should transform notification with id 3', async () => {
    const response = {
      data: [
        {
          id: 3,
          type: 'urgent',
          value: 'Old value',
        },
      ],
    };

    axios.get.mockResolvedValue(response);

    const dispatch = jest.fn();

    const result = await fetchNotifications()(
      dispatch,
      () => ({}),
      undefined
    );

    expect(result.payload).toHaveLength(1);

    expect(result.payload[0].id).toBe(3);

    expect(result.payload[0].value).toBeUndefined();

    expect(
      result.payload[0].html
    ).toBeDefined();

    expect(
      result.payload[0].html.__html
    ).toBeDefined();
  });

  test('Should remove a notification correctly', () => {
    const state = {
      notifications: [
        {
          id: 1,
          type: 'default',
          value: 'New course available',
        },
        {
          id: 2,
          type: 'urgent',
          value: 'New resume available',
        },
      ],
      loading: false,
    };

    const newState = notificationsReducer(
      state,
      markNotificationAsRead(1)
    );

    expect(newState.notifications).toEqual([
      {
        id: 2,
        type: 'urgent',
        value: 'New resume available',
      },
    ]);

    expect(newState.loading).toBe(false);
  });
});
