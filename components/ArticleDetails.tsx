import {View, Text, StyleSheet} from 'react-native';
import {ArticleDetailsProps} from '@/models/articles';
import {formatRelativeDate} from '@/utils/dateUtils';
import PulseIndicator from '@/components/PulseIndicator';
import {useIsRecentArticle} from '@/hooks/use-is-recent-article';
import {AppColors} from '@/constants/theme';

const ArticleDetails = ({article}: ArticleDetailsProps) => {
    const isRecent = useIsRecentArticle(article.created_at);
    
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{article.story_title}</Text>
                <PulseIndicator isRecent={isRecent} />
            </View>
            <View style={styles.metadata}>
                <Text style={styles.author}>{article.author} - </Text>
                <Text style={styles.date}>{formatRelativeDate(article.created_at)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: AppColors.articleBorder,
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
        color: AppColors.articleTitle,
    },
    metadata: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
    author: {
        fontSize: 12,
        color: AppColors.articleMetadata,
        fontWeight: '600',
    },
    date: {
        fontSize: 12,
        color: AppColors.articleMetadata,
        fontWeight: '400',
    },
});

export default ArticleDetails;