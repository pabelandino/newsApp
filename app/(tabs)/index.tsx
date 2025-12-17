import { ArticleList } from "@/components/ArticleList";
import NewsHeader from "@/components/NewsHeader";
import { useArticleList } from "@/hooks/use-article-list";
import { useArticles } from "@/hooks/use-articles";

export default function HomeScreen() {
    const {articles, isLoading, isError, refetch, isConnected} = useArticles('mobile');
    const {scrollY, scrollHandler, renderItem} = useArticleList();
    
    return (
        <ArticleList
            data={articles}
            renderItem={renderItem}
            scrollHandler={scrollHandler}
            scrollY={scrollY}
            headerComponent={<NewsHeader scrollY={scrollY} />}
            isLoading={isLoading}
            isError={isError}
            onRefresh={() => refetch()}
            refreshing={isLoading}
            isConnected={isConnected}
        />
    );
}

