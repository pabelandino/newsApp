export interface Article {
    story_title: string;
    author: string;
    created_at: string;
    created_at_i: number;
    story_url?: string;
    url?: string;
}

export interface ArticleDetailsProps {
    article: Article;
}

