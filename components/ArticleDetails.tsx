import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';
import {ArticleDetailsProps} from '@/models/articles';
import {formatRelativeDate} from '@/utils/dateUtils';
import PulseIndicator from '@/components/PulseIndicator';
import {useIsRecentArticle} from '@/hooks/use-is-recent-article';
import {useAppColors} from '@/hooks/use-app-colors';

const ArticleDetails = ({article}: ArticleDetailsProps) => {
    const isRecent = useIsRecentArticle(article.created_at);
    const router = useRouter();
    const colors = useAppColors();

    const handlePress = () => {
        const url = article.story_url || article.url;
        if (url) {
            router.push(`/article/${article.created_at_i}` as any);
        }
    };
    
    return (
        <TouchableOpacity
            style={[styles.container, {borderColor: colors.articleBorder, backgroundColor: colors.articleBackground}]}
            onPress={handlePress}
            activeOpacity={0.7}>
            <View style={styles.titleContainer}>
                <Text style={[styles.title, {color: colors.articleTitle}]}>{article.story_title}</Text>
                <PulseIndicator isRecent={isRecent} />
            </View>
            <View style={styles.metadata}>
                <Text style={[styles.author, {color: colors.articleMetadata}]}>{article.author} - </Text>
                <Text style={[styles.date, {color: colors.articleMetadata}]}>{formatRelativeDate(article.created_at)}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        /*The new boxShadow implementation
        * This is something that just a few people
        * know that can be implemented this way on
        * new architecture
        * */
        boxShadow: "-1px 8px 51px -38px rgba(0,0,0,0.5)"
    },
    titleContainer: {
        flexDirection: 'row',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'space-between',
        gap: 8,
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
    },
    metadata: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
    author: {
        fontSize: 12,
        fontWeight: '600',
    },
    date: {
        fontSize: 12,
        fontWeight: '400',
    },
});

export default ArticleDetails;