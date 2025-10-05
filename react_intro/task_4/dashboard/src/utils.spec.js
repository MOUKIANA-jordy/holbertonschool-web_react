import { getCurrentYear, getFooterCopy, getLatestNotification } from './utils';

describe('Utils functions tests', () => {
  describe('getCurrentYear', () => {
    test('returns the correct year', () => {
      const currentYear = new Date().getFullYear();
      const result = getCurrentYear();

      expect(typeof result).toBe('number');
      expect(result).toBe(currentYear);
    });

    test('does not create a time bomb (year is dynamic)', () => {
      // Mock Date to ensure the test doesn't break in the future
      const mockDate = new Date('2024-01-01');
      const originalDate = Date;

      // Mock Date constructor
      global.Date = jest.fn(() => mockDate);
      global.Date.prototype = originalDate.prototype;

      // Mock getFullYear method
      jest.spyOn(mockDate, 'getFullYear').mockReturnValue(2024);

      const result = getCurrentYear();
      expect(result).toBe(2024);

      // Restore original Date
      global.Date = originalDate;
    });
  });

  describe('getFooterCopy', () => {
    test('returns correct string when argument is true', () => {
      const result = getFooterCopy(true);
      expect(result).toBe('Holberton School');
    });

    test('returns correct string when argument is false', () => {
      const result = getFooterCopy(false);
      expect(result).toBe('Holberton School main dashboard');
    });

    test('handles different truthy and falsy values', () => {
      expect(getFooterCopy(1)).toBe('Holberton School');
      expect(getFooterCopy('true')).toBe('Holberton School');
      expect(getFooterCopy(0)).toBe('Holberton School main dashboard');
      expect(getFooterCopy(null)).toBe('Holberton School main dashboard');
      expect(getFooterCopy(undefined)).toBe('Holberton School main dashboard');
    });
  });

  describe('getLatestNotification', () => {
    test('returns the correct string', () => {
      const result = getLatestNotification();
      expect(result).toBe('<strong>Urgent requirement</strong> - complete by EOD');
    });

    test('returns string with HTML tags', () => {
      const result = getLatestNotification();
      expect(result).toContain('<strong>');
      expect(result).toContain('</strong>');
      expect(result).toContain('Urgent requirement');
      expect(result).toContain('complete by EOD');
    });
  });
});
