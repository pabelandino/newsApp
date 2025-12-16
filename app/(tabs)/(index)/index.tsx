import {Platform, StyleSheet, View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {newsMocks} from "@/mocks/newsMocks";
import ArticleDetails from "@/components/ArticleDetails";
import {Article} from "@/models/articles";

export default function HomeScreen() {
    const articlesData = newsMocks.hits as Article[];
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={articlesData}
                renderItem={({item}) => <ArticleDetails article={item}/>}
                keyExtractor={(item, index) => `${item.created_at_i}-${index}`}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

