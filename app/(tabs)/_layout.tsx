import {Tabs} from 'expo-router';
import React from 'react';

import {SymbolView} from 'expo-symbols';
import {Colors} from '@/constants/theme';
import {useColorScheme} from '@/hooks/use-color-scheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({color}) => <SymbolView size={28} name="house.fill"/>,
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Favorites',
                    tabBarIcon: ({color}) => <SymbolView size={28} name="heart.fill"/>,
                }}
            />
            <Tabs.Screen
                name="deleted"
                options={{
                    title: 'Deleted',
                    tabBarIcon: ({color}) => <SymbolView size={28} name="trash.fill"/>,
                }}
            />
        </Tabs>
    );
}
