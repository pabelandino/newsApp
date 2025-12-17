import {useQuery} from '@tanstack/react-query';
import {fetchNews} from '@/services/api';
import {useArticlesStore} from '@/stores/articlesStore';
import {useEffect, useMemo} from 'react';
import {useNetworkStatus} from '@/hooks/use-network-status';

export const useArticles = (query: string = 'mobile') => {
    const setArticles = useArticlesStore((state) => state.setArticles);
    // Use selector to subscribe to articles and deletedIds changes
    const articles = useArticlesStore((state) => state.articles);
    const deletedIds = useArticlesStore((state) => state.deletedIds);
    const isConnected = useNetworkStatus();

    const queryResult = useQuery({
        queryKey: ['news', query],
        queryFn: () => fetchNews(query),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: false, // Don't retry on error
        enabled: isConnected !== false, // Only fetch if we know we're connected (or if status is unknown)
    });

    // Update store when data is fetched
    useEffect(() => {
        if (queryResult.data?.hits) {
            setArticles(queryResult.data.hits);
        }
    }, [queryResult.data, setArticles]);

    // Filter articles based on deletedIds
    const filteredArticles = useMemo(() => {
        const deletedSet = new Set(deletedIds);
        return articles.filter(
            (article) => !deletedSet.has(article.created_at_i)
        );
    }, [articles, deletedIds]);

    // Only show loading if we don't have any articles in local storage
    // This way, when the app reloads, it shows the cached articles immediately
    const isLoading = queryResult.isLoading && filteredArticles.length === 0;

    // Don't show error if we have local articles and no connection
    const isError = queryResult.isError && !(filteredArticles.length > 0 && isConnected === false);

    return {
        ...queryResult,
        articles: filteredArticles,
        isLoading,
        isError,
        isConnected,
    };
};

