import {useIsRecentArticle} from '@/hooks/use-is-recent-article';

describe('useIsRecentArticle', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('should return true for articles created less than 1 hour ago', () => {
        const now = new Date('2025-12-18T10:00:00Z');
        jest.setSystemTime(now);

        const thirtyMinutesAgo = new Date('2025-12-18T09:30:00Z');
        expect(useIsRecentArticle(thirtyMinutesAgo.toISOString())).toBe(true);

        const fiveMinutesAgo = new Date('2025-12-18T09:55:00Z');
        expect(useIsRecentArticle(fiveMinutesAgo.toISOString())).toBe(true);
    });

    test('should return false for articles created more than 1 hour ago', () => {
        const now = new Date('2025-12-18T10:00:00Z');
        jest.setSystemTime(now);

        const twoHoursAgo = new Date('2025-12-18T08:00:00Z');
        expect(useIsRecentArticle(twoHoursAgo.toISOString())).toBe(false);

        const oneHourAndOneMinuteAgo = new Date('2025-12-18T08:59:00Z');
        expect(useIsRecentArticle(oneHourAndOneMinuteAgo.toISOString())).toBe(false);
    });

    test('should return false for articles created exactly 1 hour ago', () => {
        const now = new Date('2025-12-18T10:00:00Z');
        jest.setSystemTime(now);

        const exactlyOneHourAgo = new Date('2025-12-18T09:00:00Z');
        expect(useIsRecentArticle(exactlyOneHourAgo.toISOString())).toBe(false);
    });
});

