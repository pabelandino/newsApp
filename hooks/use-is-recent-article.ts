/**
 * Determines if an article was created less than 1 hour ago
 */
export function useIsRecentArticle(createdAt: string): boolean {
    const date = new Date(createdAt);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    
    return diffInHours < 1;
}

