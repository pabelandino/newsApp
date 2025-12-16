import {Stack} from 'expo-router';
import {Platform} from 'react-native';

export default function IndexLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: true,
                    headerTitle: 'Home',
                    headerLargeTitle: true,
                    headerTransparent: Platform.OS === 'ios' ? true : false,
                    headerBlurEffect: 'regular',
                }}
            />
        </Stack>
    );
}

