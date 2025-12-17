import {useFavoritesStore} from "@/stores/favoritesStore";
import {useArticlesStore} from "@/stores/articlesStore";
import FavoritesHeader from "@/components/FavoritesHeader";
import {useArticleList} from "@/hooks/use-article-list";
import {ArticleList} from "@/components/ArticleList";
import {useMemo} from 'react';

export default function FavoritesScreen() {
    const favorites = useFavoritesStore((state) => state.favorites);
    const articles = useArticlesStore((state) => state.articles);
    const {scrollY, scrollHandler, renderItem} = useArticleList();
    
    const favoriteArticles = useMemo(() => {
        const favoritesSet = new Set(favorites);
        return articles.filter((article) => favoritesSet.has(article.created_at_i));
    }, [articles, favorites]);

    return (
        <ArticleList
            data={favoriteArticles}
            renderItem={renderItem}
            scrollHandler={scrollHandler}
            scrollY={scrollY}
            headerComponent={<FavoritesHeader scrollY={scrollY} />}
            emptyMessage="No favorites yet"
        />
    );
}

