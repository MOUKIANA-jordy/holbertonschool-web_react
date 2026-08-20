import {
  getCurrentYear,
  getFooterCopy,
  getLatestNotification,
} from './utils';

describe('Utils functions', () => {
  test('getCurrentYear returns the current year', () => {
    expect(getCurrentYear()).toBe(new Date().getFullYear());
  });

  test('getFooterCopy returns the correct text when isIndex is true', () => {
    expect(getFooterCopy(true)).toBe('Holberton School');
  });

  test('getFooterCopy returns the correct text when isIndex is false', () => {
    expect(getFooterCopy(false)).toBe(
      'Holberton School main dashboard'
    );
  });

  test('getLatestNotification returns the correct notification', () => {
    expect(getLatestNotification()).toBe(
      '<strong>Urgent requirement</strong> - complete by EOD'
    );
  });
});
