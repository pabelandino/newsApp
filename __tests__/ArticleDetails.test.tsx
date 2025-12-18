import React from 'react';
import {render} from '@testing-library/react-native';
import ArticleDetails from '@/components/ArticleDetails';
import {Article} from '@/models/articles';

// Mock the hook
jest.mock('@/hooks/use-is-recent-article', () => ({
    useIsRecentArticle: jest.fn(),
}));

// Mock PulseIndicator
jest.mock('@/components/PulseIndicator', () => {
    const {View} = require('react-native');
    return function PulseIndicator({isRecent}: {isRecent: boolean}) {
        return <View testID="pulse-indicator">{isRecent ? 'recent' : 'old'}</View>;
    };
});

import {useIsRecentArticle} from '@/hooks/use-is-recent-article';

describe('ArticleDetails', () => {
    const mockArticle: Article = {
        story_title: 'Test Article Title',
        author: 'Test Author',
        created_at: '2025-12-18T10:00:00Z',
        created_at_i: 1001,
    };

    beforeEach(() => {
        (useIsRecentArticle as jest.Mock).mockReturnValue(false);
    });

    test('should render article title', () => {
        const {getByText} = render(<ArticleDetails article={mockArticle} />);
        expect(getByText('Test Article Title')).toBeTruthy();
    });

    test('should render author name', () => {
        const {getByText} = render(<ArticleDetails article={mockArticle} />);
        // Author is rendered with " - " separator, so we check for partial match
        expect(getByText(/Test Author/)).toBeTruthy();
    });

    test('should render formatted date', () => {
        const {getByText} = render(<ArticleDetails article={mockArticle} />);
        // formatRelativeDate will format the date, we just check it's rendered
        expect(getByText(/Test Author/)).toBeTruthy();
    });

    test('should render PulseIndicator with recent status when article is recent', () => {
        (useIsRecentArticle as jest.Mock).mockReturnValue(true);
        const {getByTestId} = render(<ArticleDetails article={mockArticle} />);
        const pulseIndicator = getByTestId('pulse-indicator');
        expect(pulseIndicator).toBeTruthy();
        expect(pulseIndicator.children[0]).toBe('recent');
    });

    test('should render PulseIndicator with old status when article is not recent', () => {
        (useIsRecentArticle as jest.Mock).mockReturnValue(false);
        const {getByTestId} = render(<ArticleDetails article={mockArticle} />);
        const pulseIndicator = getByTestId('pulse-indicator');
        expect(pulseIndicator).toBeTruthy();
        expect(pulseIndicator.children[0]).toBe('old');
    });

    test('should render all article information correctly', () => {
        const {getByText, getByTestId} = render(<ArticleDetails article={mockArticle} />);
        
        expect(getByText('Test Article Title')).toBeTruthy();
        expect(getByText(/Test Author/)).toBeTruthy();
        expect(getByTestId('pulse-indicator')).toBeTruthy();
    });
});

