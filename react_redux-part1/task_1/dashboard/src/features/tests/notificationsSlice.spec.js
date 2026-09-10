import mockAxios from 'jest-mock-axios';
import notificationsReducer, { fetchNotifications, markNotificationAsRead, showDrawer, hideDrawer } from '../notifications/notificationsSlice';

describe('notificationsSlice', () => {
  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  test('Should return the initial state by default', () => {
    expect(
      notificationsReducer(undefined, { type: 'unknown' })
    ).toEqual({
      notifications: [],
      displayDrawer: true,
    });
  });

  test('Should fetch notifications data correctly', async () => {
    const dispatch = jest.fn();

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

    const promise = fetchNotifications()(dispatch, () => ({}), undefined);

    mockAxios.mockResponse({
      data: notifications,
    });

    const result = await promise;

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

    expect(result.payload[2].id).toBe(3);
    expect(result.payload[2].value).not.toBe('Old notification');
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

    expect(state.displayDrawer).toBe(true);
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

    expect(state.displayDrawer).toBe(false);
  });
});
