import { View, Text, StyleSheet } from 'react-native';
import { ArticleDetailsProps } from '@/models/articles';
import { formatRelativeDate } from '@/utils/dateUtils';

const ArticleDetails = ({ article }: ArticleDetailsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{article.story_title}</Text>
      <View style={styles.metadata}>
        <Text style={styles.author}>{article.author} - </Text>
        <Text style={styles.date}>{formatRelativeDate(article.created_at)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  metadata: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
});

export default ArticleDetails;