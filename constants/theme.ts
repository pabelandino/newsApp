/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

// Common colors used across the app
export const AppColors = {
  light: {
    // Pulse indicator colors
    pulseGreen: '#4CAF50',
    favoriteOrange: '#FF9800',
    // Article colors
    articleBorder: '#e0e0e0',
    articleTitle: '#000',
    articleMetadata: '#666',
    articleBackground: '#fff',
    // Action colors
    deleteRed: '#FF3B30',
    deleteText: '#fff',
    // Tab colors
    tabIconInactive: '#9BA1A6',
    // Screen colors
    screenBackground: '#fff',
    // Header colors
    headerText: '#000',
  },
  dark: {
    // Pulse indicator colors
    pulseGreen: '#4CAF50',
    favoriteOrange: '#FF9800',
    // Article colors
    articleBorder: '#333',
    articleTitle: '#ECEDEE',
    articleMetadata: '#9BA1A6',
    articleBackground: '#1C1C1E',
    // Action colors
    deleteRed: '#FF453A',
    deleteText: '#fff',
    // Tab colors
    tabIconInactive: '#9BA1A6',
    // Screen colors
    screenBackground: '#000',
    // Header colors
    headerText: '#ECEDEE',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
