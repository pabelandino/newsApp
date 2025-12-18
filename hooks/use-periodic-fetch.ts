import {useEffect, useRef} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {checkForNewArticlesTask} from '@/services/notification-service';
import {useNotificationsStore} from '@/stores/notificationsStore';

const FETCH_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Hook to periodically check for new articles when app is in foreground
 * This complements the background fetch task
 */
export const usePeriodicFetch = () => {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const {enabled, preferredQueries} = useNotificationsStore();

    useEffect(() => {
        // Only run if notifications are enabled and user has preferences
        if (!enabled || preferredQueries.length === 0) {
            return;
        }

        const performCheck = async () => {
            try {
                await checkForNewArticlesTask(null);
            } catch (error) {
                console.error('Error in periodic fetch:', error);
            }
        };

        // Check immediately when enabled
        performCheck();

        // Set up interval to check every 5 minutes
        intervalRef.current = setInterval(() => {
            performCheck();
        }, FETCH_INTERVAL);

        // Handle app state changes
        const handleAppStateChange = (nextAppState: AppStateStatus) => {
            if (nextAppState === 'active') {
                // When app becomes active, check for new articles
                performCheck();
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            subscription.remove();
        };
    }, [enabled, preferredQueries.length]);
};

