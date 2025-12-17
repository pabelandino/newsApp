import {View, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {usePulseAnimation} from '@/animations/pulse-animation';
import {AppColors} from '@/constants/theme';

interface PulseIndicatorProps {
    isRecent: boolean;
}

const PulseIndicator = ({isRecent}: PulseIndicatorProps) => {
    const color = isRecent ? AppColors.pulseGreen : AppColors.pulseOrange;
    const pulseSize = 8; // Always small size
    
    const animatedStyle = usePulseAnimation({
        minOpacity: 0.4,
        maxOpacity: 1,
        duration: 1000,
    });

    const commonStyle = {
        width: pulseSize,
        height: pulseSize,
        borderRadius: pulseSize / 2,
        backgroundColor: color,
    };

    return (
        <View style={styles.container}>
            {isRecent ? (
                <Animated.View
                    style={[
                        styles.pulse,
                        commonStyle,
                        animatedStyle,
                    ]}
                />
            ) : (
                <View
                    style={[
                        styles.pulse,
                        commonStyle,
                    ]}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pulse: {
        // Size will be set dynamically
    },
});

export default PulseIndicator;

