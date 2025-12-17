import {create} from 'zustand';
import {persist, createJSONStorage, StateStorage} from 'zustand/middleware';
import {Article} from '@/models/articles';
import {createMMKV} from "react-native-mmkv";
import {useArticlesStore} from '@/stores/articlesStore';

const favoritesStorage = createMMKV({
    id: 'favorites-storage',
});

const zustandStorage: StateStorage = {
    setItem: (name, value) => {
        return favoritesStorage.set(name, value);
    },
    getItem: (name) => {
        const value = favoritesStorage.getString(name);
        return value ?? null;
    },
    removeItem: (name) => {
        return favoritesStorage.remove(name);
    },
};

interface FavoritesState {
    favorites: number[];
    addFavorite: (article: Article) => void;
    removeFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
    toggleFavorite: (article: Article) => void;
    getFavoriteArticles: () => Article[];
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            addFavorite: (article: Article) => {
                const {favorites} = get();
                if (!favorites.includes(article.created_at_i)) {
                    set({favorites: [...favorites, article.created_at_i]});
                }
            },
            removeFavorite: (id: number) => {
                const {favorites} = get();
                set({favorites: favorites.filter((favId) => favId !== id)});
            },
            isFavorite: (id: number) => {
                const {favorites} = get();
                return favorites.includes(id);
            },
            toggleFavorite: (article: Article) => {
                const {isFavorite, addFavorite, removeFavorite} = get();
                if (isFavorite(article.created_at_i)) {
                    removeFavorite(article.created_at_i);
                } else {
                    addFavorite(article);
                }
            },
            getFavoriteArticles: () => {
                const {favorites} = get();
                const articles = useArticlesStore.getState().articles;
                const favoritesSet = new Set(favorites);
                return articles.filter((article) => favoritesSet.has(article.created_at_i));
            },
        }),
        {
            name: 'favorites-storage',
            storage: createJSONStorage(() => zustandStorage),
        }
    )
);

