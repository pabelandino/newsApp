import {useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';
import {Article} from '@/models/articles';
import SwipeableArticleItem from '@/components/SwipeableArticleItem';
import {useArticlesStore} from '@/stores/articlesStore';
import {useFavoritesStore} from '@/stores/favoritesStore';
import {useCallback} from 'react';

interface UseArticleListOptions {
    onDelete?: (item: Article) => void;
}

export const useArticleList = (options: UseArticleListOptions = {}) => {
    const scrollY = useSharedValue(0);
    const {deleteArticle} = useArticlesStore();
    const {toggleFavorite, isFavorite} = useFavoritesStore();
    // Subscribe to favorites changes to trigger re-renders
    const favorites = useFavoritesStore((state) => state.favorites);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const handleDelete = useCallback(
        (item: Article) => {
            if (options.onDelete) {
                options.onDelete(item);
            } else {
                deleteArticle(item.created_at_i);
            }
        },
        [options.onDelete, deleteArticle]
    );

    const handleToggleFavorite = useCallback(
        (item: Article) => {
            toggleFavorite(item);
        },
        [toggleFavorite]
    );

    const renderItem = useCallback(
        ({item}: {item: Article}) => {
            return (
                <SwipeableArticleItem
                    article={item}
                    onDelete={handleDelete}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={isFavorite(item.created_at_i)}
                />
            );
        },
        [handleDelete, handleToggleFavorite, isFavorite, favorites]
    );

    return {
        scrollY,
        scrollHandler,
        renderItem,
    };
};

