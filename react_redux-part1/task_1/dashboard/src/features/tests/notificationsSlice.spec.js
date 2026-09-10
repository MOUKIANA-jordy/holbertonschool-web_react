import mockAxios from 'jest-mock-axios';
import notificationsReducer, { fetchNotifications, markNotificationAsRead, showDrawer, hideDrawer } from '../notifications/notificationsSlice';

describe('notificationsSlice', () => {
  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  test('Should return the initial state by default', () => {
    const state = notificationsReducer(undefined, {
      type: 'unknown',
    });

    expect(state).toEqual({
      notifications: [],
      displayDrawer: true,
    });
  });

  test('Should fetch notifications data correctly', async () => {
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
      {
        id: 3,
        type: 'urgent',
        value: 'Old notification',
      },
    ];

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({}));

    const promise = fetchNotifications()(
      dispatch,
      getState,
      undefined
    );

    mockAxios.mockResponse({
      data: notifications,
    });

    const result = await promise;

    expect(mockAxios.get).toHaveBeenCalledWith(
      'http://localhost:5173/notifications.json'
    );

    expect(result.payload).toHaveLength(3);

    expect(result.payload[0]).toEqual({
      id: 1,
      type: 'default',
      value: 'New course available',
    });

    expect(result.payload[1]).toEqual({
      id: 2,
      type: 'urgent',
      value: 'New resume available',
    });

    expect(result.payload[2]).toEqual(
      expect.objectContaining({
        id: 3,
        type: 'urgent',
        html: {
          __html: expect.any(String),
        },
      })
    );

    expect(result.payload[2]).not.toHaveProperty('value');
  });

  test('Should remove a notification correctly', () => {
    const initialState = {
      notifications: [
        {
          id: 1,
          type: 'default',
          value: 'Notification 1',
        },
        {
          id: 2,
          type: 'urgent',
          value: 'Notification 2',
        },
      ],
      displayDrawer: true,
    };

    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    const state = notificationsReducer(
      initialState,
      markNotificationAsRead(1)
    );

    expect(state.notifications).toEqual([
      {
        id: 2,
        type: 'urgent',
        value: 'Notification 2',
      },
    ]);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Notification 1 has been marked as read'
    );

    consoleSpy.mockRestore();
  });

  test('Should show the notifications drawer', () => {
    const initialState = {
      notifications: [],
      displayDrawer: false,
    };

    const state = notificationsReducer(
      initialState,
      showDrawer()
    );

    expect(state).toEqual({
      notifications: [],
      displayDrawer: true,
    });
  });

  test('Should hide the notifications drawer', () => {
    const initialState = {
      notifications: [],
      displayDrawer: true,
    };

    const state = notificationsReducer(
      initialState,
      hideDrawer()
    );

    expect(state).toEqual({
      notifications: [],
      displayDrawer: false,
    });
  });
});
