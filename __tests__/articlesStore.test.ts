import {useArticlesStore} from '@/stores/articlesStore';
import {Article} from '@/models/articles';

// Reset store before each test
beforeEach(() => {
    useArticlesStore.setState({
        articles: [],
        deletedIds: [],
        deletedArticles: [],
    });
});

describe('ArticlesStore', () => {
    const mockArticle1: Article = {
        story_title: 'Test Article 1',
        author: 'Author 1',
        created_at: '2025-12-18T10:00:00Z',
        created_at_i: 1001,
    };

    const mockArticle2: Article = {
        story_title: 'Test Article 2',
        author: 'Author 2',
        created_at: '2025-12-18T11:00:00Z',
        created_at_i: 1002,
    };

    const mockArticle3: Article = {
        story_title: 'Test Article 3',
        author: 'Author 3',
        created_at: '2025-12-18T12:00:00Z',
        created_at_i: 1003,
    };

    test('should add articles to store', () => {
        const {setArticles} = useArticlesStore.getState();
        setArticles([mockArticle1, mockArticle2]);

        const {articles} = useArticlesStore.getState();
        expect(articles).toHaveLength(2);
        expect(articles[0].created_at_i).toBe(1001);
        expect(articles[1].created_at_i).toBe(1002);
    });

    test('should not add duplicate articles', () => {
        const {setArticles} = useArticlesStore.getState();
        setArticles([mockArticle1]);
        setArticles([mockArticle1, mockArticle2]); // mockArticle1 is duplicate

        const {articles} = useArticlesStore.getState();
        expect(articles).toHaveLength(2);
    });

    test('should delete article and add to deletedIds and deletedArticles', () => {
        const {setArticles, deleteArticle} = useArticlesStore.getState();
        setArticles([mockArticle1, mockArticle2]);

        deleteArticle(1001);

        const {articles, deletedIds, deletedArticles} = useArticlesStore.getState();
        expect(articles).toHaveLength(1);
        expect(articles[0].created_at_i).toBe(1002);
        expect(deletedIds).toContain(1001);
        expect(deletedArticles).toHaveLength(1);
        expect(deletedArticles[0].created_at_i).toBe(1001);
    });

    test('should filter out deleted articles when setting new articles', () => {
        const {setArticles, deleteArticle} = useArticlesStore.getState();
        setArticles([mockArticle1, mockArticle2]);
        deleteArticle(1001);

        // Try to add deleted article back
        setArticles([mockArticle1, mockArticle3]);

        const {articles} = useArticlesStore.getState();
        expect(articles).toHaveLength(2);
        expect(articles.some((a) => a.created_at_i === 1001)).toBe(false);
        expect(articles.some((a) => a.created_at_i === 1003)).toBe(true);
    });

    test('should restore deleted article', () => {
        const {setArticles, deleteArticle, restoreArticle} = useArticlesStore.getState();
        setArticles([mockArticle1, mockArticle2]);
        deleteArticle(1001);

        restoreArticle(1001);

        const {articles, deletedIds, deletedArticles} = useArticlesStore.getState();
        expect(articles).toHaveLength(2);
        expect(articles.some((a) => a.created_at_i === 1001)).toBe(true);
        expect(deletedIds).not.toContain(1001);
        expect(deletedArticles).toHaveLength(0);
    });

    test('getFilteredArticles should return articles not in deletedIds', () => {
        const {setArticles, deleteArticle, getFilteredArticles} = useArticlesStore.getState();
        setArticles([mockArticle1, mockArticle2, mockArticle3]);
        deleteArticle(1002);

        const filtered = getFilteredArticles();
        expect(filtered).toHaveLength(2);
        expect(filtered.some((a) => a.created_at_i === 1002)).toBe(false);
        expect(filtered.some((a) => a.created_at_i === 1001)).toBe(true);
        expect(filtered.some((a) => a.created_at_i === 1003)).toBe(true);
    });

    test('getDeletedArticles should return all deleted articles', () => {
        const {setArticles, deleteArticle, getDeletedArticles} = useArticlesStore.getState();
        setArticles([mockArticle1, mockArticle2, mockArticle3]);
        deleteArticle(1001);
        deleteArticle(1002);

        const deleted = getDeletedArticles();
        expect(deleted).toHaveLength(2);
        expect(deleted.some((a) => a.created_at_i === 1001)).toBe(true);
        expect(deleted.some((a) => a.created_at_i === 1002)).toBe(true);
    });
});

