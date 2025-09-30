import { getCurrentYear, getFooterCopy, getLatestNotification } from './utils';

describe('Utility functions', () => {
  test('getCurrentYear returns current year', () => {
    const year = getCurrentYear();
    expect(typeof year).toBe('number');
    expect(year).toBe(new Date().getFullYear());
  });

  test('getFooterCopy returns correct string when true', () => {
    const result = getFooterCopy(true);
    expect(result).toBe('Holberton School');
  });

  test('getFooterCopy returns correct string when false', () => {
    const result = getFooterCopy(false);
    expect(result).toBe('Holberton School main dashboard');
  });

  test('getLatestNotification returns correct string', () => {
    const result = getLatestNotification();
    expect(result).toBe('<strong>Urgent requirement</strong> - complete by EOD');
  });
});
