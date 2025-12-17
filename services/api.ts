import {Article} from '@/models/articles';

const API_BASE_URL = 'https://hn.algolia.com/api/v1';

export interface NewsApiResponse {
    hits: Article[];
    nbHits: number;
    page: number;
    nbPages: number;
    hitsPerPage: number;
    exhaustiveNbHits: boolean;
    query: string;
    params: string;
    processingTimeMS: number;
}

export const fetchNews = async (query: string = 'mobile'): Promise<NewsApiResponse> => {
    const response = await fetch(
        `${API_BASE_URL}/search_by_date?query=${encodeURIComponent(query)}`
    );
    
    if (!response.ok) {
        throw new Error('Failed to fetch news');
    }
    
    return response.json();
};

