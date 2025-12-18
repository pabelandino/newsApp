import {useLocalSearchParams, useRouter} from 'expo-router';
import {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View, useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import {useArticlesStore} from '@/stores/articlesStore';
import {useAppColors} from '@/hooks/use-app-colors';

export default function ArticleDetailScreen() {
    const {id} = useLocalSearchParams<{id: string}>();
    const router = useRouter();
    const articles = useArticlesStore((state) => state.articles);
    const [loading, setLoading] = useState(true);
    const colors = useAppColors();
    const colorScheme = useColorScheme();

    const article = articles.find((a) => a.created_at_i.toString() === id);
    // Try to get URL from article, or from notification data if article not found
    const url = article?.story_url || article?.url;

    useEffect(() => {
        if (!article || !url) {
            // If article not found or no URL, go back after a short delay
            const timer = setTimeout(() => {
                router.back();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [article, url, router]);

    if (!article || !url) {
        return (
            <SafeAreaView style={[styles.container, {backgroundColor: colors.screenBackground}]}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: colors.screenBackground}]}>
            {loading && (
                <View style={[styles.loadingContainer, {backgroundColor: colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'}]}>
                    <ActivityIndicator size="large" />
                </View>
            )}
            <WebView
                source={{uri: url}}
                style={styles.webview}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                onError={(syntheticEvent) => {
                    const {nativeEvent} = syntheticEvent;
                    console.error('WebView error: ', nativeEvent);
                    setLoading(false);
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
});

