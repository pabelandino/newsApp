import {formatRelativeDate} from '@/utils/dateUtils';

describe('formatRelativeDate', () => {
    beforeEach(() => {
        // Mock current date to have consistent tests
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('should return minutes format for very recent dates (less than 1 hour)', () => {
        const now = new Date('2025-12-18T10:00:00Z');
        jest.setSystemTime(now);

        const twoMinutesAgo = new Date('2025-12-18T09:58:00Z');
        expect(formatRelativeDate(twoMinutesAgo.toISOString())).toBe('2m');

        const oneMinuteAgo = new Date('2025-12-18T09:59:00Z');
        expect(formatRelativeDate(oneMinuteAgo.toISOString())).toBe('1m');
    });

    test('should return hours format for dates less than 24 hours ago', () => {
        const now = new Date('2025-12-18T10:00:00Z');
        jest.setSystemTime(now);

        const twoHoursAgo = new Date('2025-12-18T08:00:00Z');
        expect(formatRelativeDate(twoHoursAgo.toISOString())).toBe('2h');

        const fiveHoursAgo = new Date('2025-12-18T05:00:00Z');
        expect(formatRelativeDate(fiveHoursAgo.toISOString())).toBe('5h');
    });

    test('should return "yesterday" for dates from yesterday', () => {
        const now = new Date('2025-12-18T10:00:00Z');
        jest.setSystemTime(now);

        // Yesterday at same time
        const yesterday = new Date('2025-12-17T10:00:00Z');
        expect(formatRelativeDate(yesterday.toISOString())).toBe('yesterday');
    });

    test('should return full date format for older dates', () => {
        const now = new Date('2025-12-18T10:00:00Z');
        jest.setSystemTime(now);

        const oldDate = new Date('2025-06-02T10:00:00Z');
        expect(formatRelativeDate(oldDate.toISOString())).toBe('2 jun 2025');

        const veryOldDate = new Date('2024-01-15T10:00:00Z');
        expect(formatRelativeDate(veryOldDate.toISOString())).toBe('15 jan 2024');
    });

    test('should handle different month abbreviations correctly', () => {
        const now = new Date('2025-12-18T10:00:00Z');
        jest.setSystemTime(now);

        const marchDate = new Date('2025-03-10T10:00:00Z');
        expect(formatRelativeDate(marchDate.toISOString())).toBe('10 mar 2025');

        const decemberDate = new Date('2024-12-25T10:00:00Z');
        expect(formatRelativeDate(decemberDate.toISOString())).toBe('25 dec 2024');
    });
});

