import {useArticlesStore} from "@/stores/articlesStore";
import DeletedHeader from "@/components/DeletedHeader";
import {ArticleList} from "@/components/ArticleList";
import {useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';
import ArticleDetails from '@/components/ArticleDetails';
import {Article} from '@/models/articles';
import {ListRenderItem} from 'react-native';

export default function DeletedScreen() {
    const deletedArticles = useArticlesStore((state) => state.deletedArticles);
    const scrollY = useSharedValue(0);
    
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const renderItem: ListRenderItem<Article> = ({item}) => {
        return <ArticleDetails article={item} />;
    };

    return (
        <ArticleList
            data={deletedArticles}
            renderItem={renderItem}
            scrollHandler={scrollHandler}
            scrollY={scrollY}
            headerComponent={<DeletedHeader scrollY={scrollY} />}
            emptyMessage="No deleted articles"
        />
    );
}

