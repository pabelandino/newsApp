import {useColorScheme} from 'react-native';
import {AppColors} from '@/constants/theme';

/**
 * Hook to get app colors based on current color scheme
 * Returns light or dark colors depending on system preference
 */
export const useAppColors = () => {
    const colorScheme = useColorScheme();
    return AppColors[colorScheme === 'dark' ? 'dark' : 'light'];
};

