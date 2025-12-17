import {useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing} from 'react-native-reanimated';

export interface PulseAnimationConfig {
    minOpacity?: number;
    maxOpacity?: number;
    duration?: number;
}

/**
 * Creates a pulse animation that repeats infinitely
 */
export function usePulseAnimation(config: PulseAnimationConfig = {}) {
    const {minOpacity = 0.3, maxOpacity = 1, duration = 1000} = config;
    
    const opacity = useSharedValue(maxOpacity);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    // Start the animation
    opacity.value = withRepeat(
        withTiming(minOpacity, {
            duration: duration,
            easing: Easing.inOut(Easing.ease),
        }),
        -1, // Infinite repeat
        true // Reverse animation
    );

    return animatedStyle;
}

