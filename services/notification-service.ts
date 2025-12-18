import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import {fetchNews} from './api';
import {useArticlesStore} from '@/stores/articlesStore';
import {useNotificationsStore} from '@/stores/notificationsStore';
import {Article} from '@/models/articles';

export interface NotificationTaskPayload {
    error?: string;
}

/**
 * Background task that checks for new articles matching user preferences
 * This is registered with TaskManager and runs periodically (every 5 minutes minimum)
 */
export async function checkForNewArticlesTask(
    payload: NotificationTaskPayload | null
): Promise<void> {
    try {
        const notificationsStore = useNotificationsStore.getState();
        const articlesStore = useArticlesStore.getState();

        // Check if notifications are enabled
        if (!notificationsStore.enabled) {
            return;
        }

        // Get user's preferred queries
        const preferredQueries = notificationsStore.preferredQueries;
        if (preferredQueries.length === 0) {
            return;
        }

        // Get last checked timestamp
        const lastChecked = notificationsStore.lastCheckedTimestamp;
        const now = Date.now();
        let hasNewArticles = false;

        // Track notified article IDs to avoid duplicates
        const notifiedArticleIds = new Set<number>();

        // Check each preferred query
        for (const query of preferredQueries) {
            try {
                const response = await fetchNews(query);
                
                // Filter articles that are:
                // 1. Newer than last check
                // 2. Not already in the local store (to avoid duplicates)
                // 3. Match the preferred query
                const existingArticleIds = new Set(
                    articlesStore.articles.map((a) => a.created_at_i)
                );
                
                const newArticles = response.hits.filter((article) => {
                    const articleDate = new Date(article.created_at).getTime();
                    const isNew = articleDate > lastChecked;
                    const notInStore = !existingArticleIds.has(article.created_at_i);
                    const notAlreadyNotified = !notifiedArticleIds.has(article.created_at_i);
                    
                    return isNew && notInStore && notAlreadyNotified;
                });

                // Send notification for each new article that matches preferences
                for (const article of newArticles) {
                    // Add article to store so it's available when notification is tapped
                    articlesStore.setArticles([article]);
                    await sendArticleNotification(article, query);
                    notifiedArticleIds.add(article.created_at_i);
                    hasNewArticles = true;
                }
            } catch (error) {
                console.error(`Error checking for new articles with query "${query}":`, error);
            }
        }

        // Update last checked timestamp
        notificationsStore.updateLastCheckedTimestamp();
    } catch (error) {
        console.error('Error in checkForNewArticlesTask:', error);
    }
}

/**
 * Send a notification for a new article
 */
async function sendArticleNotification(article: Article, query: string) {
    try {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: article.story_title || 'New article',
                body: `By ${article.author} - ${query}`,
                data: {
                    articleId: article.created_at_i,
                    article: article,
                },
                sound: true,
            },
            trigger: null, // Show immediately
        });
    } catch (error) {
        console.error('Error sending notification:', error);
    }
}

// Define the task before registering
TaskManager.defineTask('CHECK_NEW_ARTICLES', checkForNewArticlesTask);

/**
 * Register the background task
 * Note: iOS has a minimum interval of 15 minutes for background fetch
 * The system may not execute exactly every 5 minutes, but will try to honor the minimum interval
 */
export async function registerBackgroundTask() {
    try {
        // Register the task with background fetch
        try {
            await BackgroundFetch.registerTaskAsync('CHECK_NEW_ARTICLES', {
                minimumInterval: 5 * 60, // 5 minutes (iOS minimum is 15 minutes, but we request 5)
                stopOnTerminate: false,
                startOnBoot: true,
            });
            console.log('Background task registered successfully with 5 minute interval');
        } catch (registerError) {
            // Background fetch might not be available on all platforms
            console.log('Background fetch registration:', registerError);
        }
    } catch (error) {
        console.error('Error registering background task:', error);
    }
}

