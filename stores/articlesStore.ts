import {create} from 'zustand';
import {persist, createJSONStorage, StateStorage} from 'zustand/middleware';
import {Article} from '@/models/articles';
import {createMMKV} from "react-native-mmkv";

const articlesStorage = createMMKV({
    id: 'articles-storage',
});

const zustandStorage: StateStorage = {
    setItem: (name, value) => {
        return articlesStorage.set(name, value);
    },
    getItem: (name) => {
        const value = articlesStorage.getString(name);
        return value ?? null;
    },
    removeItem: (name) => {
        return articlesStorage.remove(name);
    },
};

interface ArticlesState {
    articles: Article[];
    deletedIds: number[];
    deletedArticles: Article[];
    setArticles: (articles: Article[]) => void;
    deleteArticle: (id: number) => void;
    getFilteredArticles: () => Article[];
    getDeletedArticles: () => Article[];
    restoreArticle: (id: number) => void;
}

export const useArticlesStore = create<ArticlesState>()(
    persist(
        (set, get) => ({
            articles: [],
            deletedIds: [],
            deletedArticles: [],
            setArticles: (newArticles: Article[]) => {
                const {articles: currentArticles, deletedIds} = get();
                const deletedSet = new Set(deletedIds);
                
                // Filter out deleted articles from new articles
                const filteredNewArticles = newArticles.filter(
                    (article) => !deletedSet.has(article.created_at_i)
                );
                
                // Create a map of existing articles by ID for quick lookup
                const existingArticlesMap = new Map(
                    currentArticles.map((article) => [article.created_at_i, article])
                );
                
                // Merge new articles with existing ones, avoiding duplicates
                const mergedArticles = [...currentArticles];
                filteredNewArticles.forEach((newArticle) => {
                    if (!existingArticlesMap.has(newArticle.created_at_i)) {
                        mergedArticles.push(newArticle);
                    }
                });
                
                set({articles: mergedArticles});
            },
            deleteArticle: (id: number) => {
                const {articles, deletedIds, deletedArticles} = get();
                // Find the article to delete
                const articleToDelete = articles.find(
                    (article) => article.created_at_i === id
                );
                
                // Remove from articles array
                const filteredArticles = articles.filter(
                    (article) => article.created_at_i !== id
                );
                
                // Add to deletedIds if not already there
                const updatedDeletedIds = deletedIds.includes(id)
                    ? deletedIds
                    : [...deletedIds, id];
                
                // Add to deletedArticles if not already there
                const updatedDeletedArticles = articleToDelete
                    ? [...deletedArticles.filter((a) => a.created_at_i !== id), articleToDelete]
                    : deletedArticles;
                
                set({
                    articles: filteredArticles,
                    deletedIds: updatedDeletedIds,
                    deletedArticles: updatedDeletedArticles,
                });
            },
            getFilteredArticles: () => {
                const {articles, deletedIds} = get();
                const deletedSet = new Set(deletedIds);
                return articles.filter(
                    (article) => !deletedSet.has(article.created_at_i)
                );
            },
            getDeletedArticles: () => {
                const {deletedArticles} = get();
                return deletedArticles;
            },
            restoreArticle: (id: number) => {
                const {articles, deletedIds, deletedArticles} = get();
                // Find the article to restore
                const articleToRestore = deletedArticles.find(
                    (article) => article.created_at_i === id
                );
                
                if (articleToRestore) {
                    // Remove from deletedIds
                    const updatedDeletedIds = deletedIds.filter((deletedId) => deletedId !== id);
                    
                    // Remove from deletedArticles
                    const updatedDeletedArticles = deletedArticles.filter(
                        (article) => article.created_at_i !== id
                    );
                    
                    // Add back to articles if not already there
                    const articleExists = articles.some(
                        (article) => article.created_at_i === id
                    );
                    const updatedArticles = articleExists
                        ? articles
                        : [...articles, articleToRestore];
                    
                    set({
                        articles: updatedArticles,
                        deletedIds: updatedDeletedIds,
                        deletedArticles: updatedDeletedArticles,
                    });
                }
            },
        }),
        {
            name: 'articles-storage',
            storage: createJSONStorage(() => zustandStorage),
        }
    )
);

