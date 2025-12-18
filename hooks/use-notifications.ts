import {useEffect, useState} from 'react';
import * as Notifications from 'expo-notifications';
import {Platform, Alert} from 'react-native';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import {useNotificationsStore} from '@/stores/notificationsStore';

// Configure how notifications are handled when app is in foreground
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export const useNotifications = () => {
    const [expoPushToken, setExpoPushToken] = useState<string>('');
    const [permissionStatus, setPermissionStatus] = useState<Notifications.PermissionStatus | null>(null);
    const {enabled, setEnabled} = useNotificationsStore();

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            if (token) {
                setExpoPushToken(token);
            }
        });

        // Check current permission status
        Notifications.getPermissionsAsync().then(({status}) => {
            setPermissionStatus(status);
            setEnabled(status === 'granted');
        });
    }, []);

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'Default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (!Device.isDevice) {
            Alert.alert(
                'Notifications',
                'Push notifications only work on physical devices.'
            );
            return false;
        }

        // Check current permission status
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        
        // If already granted, return true
        if (existingStatus === 'granted') {
            setPermissionStatus(existingStatus);
            setEnabled(true);
            return true;
        }

        // Show informative alert before requesting permission
        return new Promise<boolean>((resolve) => {
            Alert.alert(
                'Enable Push Notifications',
                'We would like to send you notifications when new articles matching your interests are published. This helps you stay up-to-date with the latest news without having to constantly check the app.\n\nYou can customize which topics you want to receive notifications about in the settings below.',
                [
                    {
                        text: 'Not Now',
                        style: 'cancel',
                        onPress: () => {
                            resolve(false);
                        },
                    },
                    {
                        text: 'Enable',
                        onPress: async () => {
                            const {status} = await Notifications.requestPermissionsAsync({
                                ios: {
                                    allowAlert: true,
                                    allowBadge: true,
                                    allowSound: true,
                                    allowAnnouncements: false,
                                },
                            });
                            
                            setPermissionStatus(status);
                            setEnabled(status === 'granted');
                            
                            if (status !== 'granted') {
                                Alert.alert(
                                    'Permission Denied',
                                    'Notification permission was not granted. You can enable it later in your device settings. Without this permission, you won\'t receive notifications about new articles, but you can still browse and read articles in the app.',
                                    [{text: 'OK'}]
                                );
                                resolve(false);
                            } else {
                                resolve(true);
                            }
                        },
                    },
                ],
                {cancelable: true, onDismiss: () => resolve(false)}
            );
        });
    };

    return {
        expoPushToken,
        permissionStatus,
        enabled,
        requestPermissions,
    };
};

async function registerForPushNotificationsAsync(): Promise<string | undefined> {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'Default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            // Don't request here, let the user do it explicitly
            return undefined;
        }

        try {
            const projectId =
                Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
            if (!projectId) {
                console.warn('Project ID not found. Push notifications may not work.');
                return undefined;
            }
            token = (await Notifications.getExpoPushTokenAsync({projectId})).data;
        } catch (e) {
            console.error('Error getting push token:', e);
            token = undefined;
        }
    } else {
        console.warn('Must use physical device for Push Notifications');
    }

    return token;
}

