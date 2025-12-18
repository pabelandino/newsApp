import {useFavoritesStore} from '@/stores/favoritesStore';
import {useArticlesStore} from '@/stores/articlesStore';
import {Article} from '@/models/articles';

// Reset stores before each test
beforeEach(() => {
    useFavoritesStore.setState({
        favorites: [],
    });
    useArticlesStore.setState({
        articles: [],
        deletedIds: [],
        deletedArticles: [],
    });
});

describe('FavoritesStore', () => {
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

    test('should add article to favorites', () => {
        const {addFavorite} = useFavoritesStore.getState();
        addFavorite(mockArticle1);

        const {favorites, isFavorite} = useFavoritesStore.getState();
        expect(favorites).toContain(1001);
        expect(isFavorite(1001)).toBe(true);
    });

    test('should not add duplicate favorites', () => {
        const {addFavorite} = useFavoritesStore.getState();
        addFavorite(mockArticle1);
        addFavorite(mockArticle1); // Try to add again

        const {favorites} = useFavoritesStore.getState();
        expect(favorites).toHaveLength(1);
        expect(favorites.filter((id) => id === 1001)).toHaveLength(1);
    });

    test('should remove article from favorites', () => {
        const {addFavorite, removeFavorite, isFavorite} = useFavoritesStore.getState();
        addFavorite(mockArticle1);
        addFavorite(mockArticle2);

        removeFavorite(1001);

        const {favorites} = useFavoritesStore.getState();
        expect(favorites).not.toContain(1001);
        expect(favorites).toContain(1002);
        expect(isFavorite(1001)).toBe(false);
        expect(isFavorite(1002)).toBe(true);
    });

    test('should toggle favorite status', () => {
        const {toggleFavorite, isFavorite} = useFavoritesStore.getState();

        // Toggle on
        toggleFavorite(mockArticle1);
        expect(isFavorite(1001)).toBe(true);

        // Toggle off
        toggleFavorite(mockArticle1);
        expect(isFavorite(1001)).toBe(false);

        // Toggle on again
        toggleFavorite(mockArticle1);
        expect(isFavorite(1001)).toBe(true);
    });

    test('getFavoriteArticles should return only favorite articles from store', () => {
        const {setArticles} = useArticlesStore.getState();
        const {addFavorite, getFavoriteArticles} = useFavoritesStore.getState();

        setArticles([mockArticle1, mockArticle2]);
        addFavorite(mockArticle1);

        const favoriteArticles = getFavoriteArticles();
        expect(favoriteArticles).toHaveLength(1);
        expect(favoriteArticles[0].created_at_i).toBe(1001);
    });

    test('getFavoriteArticles should return empty array when no favorites', () => {
        const {setArticles} = useArticlesStore.getState();
        const {getFavoriteArticles} = useFavoritesStore.getState();

        setArticles([mockArticle1, mockArticle2]);

        const favoriteArticles = getFavoriteArticles();
        expect(favoriteArticles).toHaveLength(0);
    });
});

