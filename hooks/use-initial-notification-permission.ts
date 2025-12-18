import {useEffect, useRef} from 'react';
import {Platform} from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {useNotificationsStore} from '@/stores/notificationsStore';
import {useNotifications} from '@/hooks/use-notifications';

/**
 * Hook to request notification permission on first app launch
 * This should be called once when the app starts
 */
export const useInitialNotificationPermission = () => {
    const {hasRequestedInitialPermission, setHasRequestedInitialPermission} = useNotificationsStore();
    const {requestPermissions} = useNotifications();
    const hasRequestedRef = useRef(false);

    useEffect(() => {
        // Only request once, even if component re-renders
        if (hasRequestedRef.current) {
            return;
        }

        // Check if we've already requested permission on first launch
        if (hasRequestedInitialPermission) {
            hasRequestedRef.current = true;
            return;
        }

        // Only request on physical devices
        if (!Device.isDevice) {
            return;
        }

        // Check current permission status
        const checkAndRequest = async () => {
            try {
                const {status} = await Notifications.getPermissionsAsync();
                
                // If already granted or denied, mark as requested and don't show dialog
                if (status === 'granted' || status === 'denied') {
                    setHasRequestedInitialPermission(true);
                    hasRequestedRef.current = true;
                    return;
                }

                // If not determined (first launch), request permission
                if (status === 'undetermined') {
                    // Mark as requested first to prevent multiple requests
                    setHasRequestedInitialPermission(true);
                    hasRequestedRef.current = true;
                    
                    // Request permission with the informative dialog
                    await requestPermissions();
                }
            } catch (error) {
                console.error('Error checking notification permissions:', error);
            }
        };

        // Small delay to ensure app is fully loaded
        const timer = setTimeout(() => {
            checkAndRequest();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [hasRequestedInitialPermission, setHasRequestedInitialPermission, requestPermissions]);
};

