import { usePeriodicFetch } from '@/hooks/use-periodic-fetch';
import { registerBackgroundTask } from '@/services/notification-service';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { useColorScheme } from '@/hooks/use-color-scheme';

const queryClient = new QueryClient();

export const unstable_settings = {
    anchor: '(tabs)',
};

function NotificationHandler() {
    const router = useRouter();
    const notificationListener = useRef<Notifications.EventSubscription | null>(null);
    const responseListener = useRef<Notifications.EventSubscription | null>(null);
    
    // Enable periodic fetch when app is in foreground
    usePeriodicFetch();

    useEffect(() => {
        // Register background task
        registerBackgroundTask().catch(console.error);

        // Listen for notifications received while app is in foreground
        notificationListener.current = Notifications.addNotificationReceivedListener(
            (notification) => {
                console.log('Notification received:', notification);
            }
        );

        // Listen for user tapping on notification
        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                const data = response.notification.request.content.data;
                if (data?.articleId) {
                    // Navigate to the article (you can create a detail screen later)
                    // For now, just navigate to home
                    router.push('/(tabs)/index' as any);
                }
            }
        );

        return () => {
            if (notificationListener.current) {
                notificationListener.current.remove();
            }
            if (responseListener.current) {
                responseListener.current.remove();
            }
        };
    }, [router]);

    return null;
}

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaProvider>
                    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                        <NotificationHandler />
                        <Stack>
                            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                            <Stack.Screen name="modal" options={{presentation: 'modal', title: 'Modal'}}/>
                        </Stack>
                        <StatusBar style="auto"/>
                    </ThemeProvider>
                </SafeAreaProvider>
            </GestureHandlerRootView>
            <Toast />
        </QueryClientProvider>
    );
}
