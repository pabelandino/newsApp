export interface Article {
    story_title: string;
    author: string;
    created_at: string;
    created_at_i: number;
}

export interface ArticleDetailsProps {
    article: Article;
}

