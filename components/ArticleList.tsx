import {Platform, StyleSheet, FlatList, ActivityIndicator, Text, ListRenderItem, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {SharedValue} from 'react-native-reanimated';
import {Article} from '@/models/articles';
import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {useAppColors} from '@/hooks/use-app-colors';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<Article>);

interface ArticleListProps {
    data: Article[];
    renderItem: ListRenderItem<Article>;
    scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    scrollY: SharedValue<number>;
    headerComponent: React.ReactElement;
    isLoading?: boolean;
    isError?: boolean;
    errorMessage?: string;
    emptyMessage?: string;
    onRefresh?: () => void;
    refreshing?: boolean;
    isConnected?: boolean | null;
}

export const HEADER_PADDING = Platform.OS === 'ios' ? 96 : 0;

export const ArticleList = ({
    data,
    renderItem,
    scrollHandler,
    scrollY,
    headerComponent,
    isLoading,
    isError,
    errorMessage = 'Error loading news',
    emptyMessage,
    onRefresh,
    refreshing,
    isConnected,
}: ArticleListProps) => {
    const colors = useAppColors();
    
    // Show toast if no connection and we have local data
    useEffect(() => {
        if (isConnected === false && data.length > 0 && isError) {
            Toast.show({
                type: 'info',
                text1: 'No connection',
                text2: 'Showing locally saved data',
                position: 'top',
                visibilityTime: 3000,
            });
        }
    }, [isConnected, data.length, isError]);

    if (isLoading) {
        return (
            <SafeAreaView style={[styles.container, styles.centerContent, {backgroundColor: colors.screenBackground}]}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }

    // Only show error screen if we have no local data
    // If we have local data but no connection, show the data with a toast
    if (isError && data.length === 0) {
        return (
            <SafeAreaView style={[styles.container, styles.centerContent, {backgroundColor: colors.screenBackground}]}>
                <Text style={[styles.errorText, {color: colors.articleMetadata}]}>{errorMessage}</Text>
            </SafeAreaView>
        );
    }

    if (data.length === 0 && emptyMessage) {
        return (
            <SafeAreaView style={[styles.container, styles.centerContent, {backgroundColor: colors.screenBackground}]}>
                <Text style={[styles.emptyText, {color: colors.articleMetadata}]}>{emptyMessage}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: colors.screenBackground}]}>
            <AnimatedFlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.created_at_i}-${index}`}
                contentContainerStyle={{
                    paddingTop: HEADER_PADDING,
                }}
                contentInsetAdjustmentBehavior="automatic"
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                ListHeaderComponent={headerComponent}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
    },
    emptyText: {
        fontSize: 16,
    },
});


