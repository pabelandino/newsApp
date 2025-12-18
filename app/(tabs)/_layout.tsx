import {Tabs} from 'expo-router';
import React from 'react';

import {SymbolView} from 'expo-symbols';
import {AppColors} from '@/constants/theme';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: AppColors.favoriteOrange,
                tabBarInactiveTintColor: AppColors.tabIconInactive,
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
