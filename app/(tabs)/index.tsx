import {Platform, StyleSheet, FlatList} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';
import {useState} from 'react';
import {newsMocks} from "@/mocks/newsMocks";
import {Article} from "@/models/articles";
import NewsHeader from "@/components/NewsHeader";
import SwipeableArticleItem from "@/components/SwipeableArticleItem";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<Article>);

export default function HomeScreen() {
    const [articlesData, setArticlesData] = useState<Article[]>(newsMocks.hits as Article[]);
    const insets = useSafeAreaInsets();
    const scrollY = useSharedValue(0);
    
    // Calculate padding for transparent header (iOS large title is approximately 96px)
    const headerPadding = Platform.OS === 'ios' ? 96 : 0;
    
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const handleDelete = (item: Article) => {
        setArticlesData(prevData => 
            prevData.filter(article => article.created_at_i !== item.created_at_i)
        );
    };

    const renderItem = ({item}: {item: Article}) => {
        return (
            <SwipeableArticleItem 
                article={item} 
                onDelete={handleDelete}
            />
        );
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <AnimatedFlatList
                data={articlesData}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.created_at_i}-${index}`}
                contentContainerStyle={{
                    paddingTop: headerPadding,
                }}
                contentInsetAdjustmentBehavior="automatic"
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                ListHeaderComponent={<NewsHeader scrollY={scrollY} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    renderItemStyle: {
        gap: 18,
        marginLeft: 4
    }
});

