import {Tabs} from 'expo-router';
import React from 'react';

import {SymbolView} from 'expo-symbols';
import {useAppColors} from '@/hooks/use-app-colors';

export default function TabLayout() {
    const colors = useAppColors();
    
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.favoriteOrange,
                tabBarInactiveTintColor: colors.tabIconInactive,
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({color}) => <SymbolView size={28} name="house.fill" tintColor={color}/>,
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Favorites',
                    tabBarIcon: ({color}) => <SymbolView size={28} name="heart.fill" tintColor={color}/>,
                }}
            />
            <Tabs.Screen
                name="deleted"
                options={{
                    title: 'Deleted',
                    tabBarIcon: ({color}) => <SymbolView size={28} name="trash.fill" tintColor={color}/>,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({color}) => <SymbolView size={28} name="gearshape.fill" tintColor={color}/>,
                }}
            />
        </Tabs>
    );
}
