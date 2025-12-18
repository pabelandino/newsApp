import {StyleSheet, Text} from 'react-native';
import Animated, {
    useAnimatedStyle,
    interpolate,
    Extrapolation,
    SharedValue,
} from 'react-native-reanimated';
import {useAppColors} from '@/hooks/use-app-colors';

interface NewsHeaderProps {
    scrollY: SharedValue<number>;
}

const NewsHeader = ({scrollY}: NewsHeaderProps) => {
    const colors = useAppColors();
    const animatedStyle = useAnimatedStyle(() => {
        // Animate opacity and scale based on scroll position
        const opacity = interpolate(
            scrollY.value,
            [0, 100],
            [1, 0],
            Extrapolation.CLAMP
        );

        const scale = interpolate(
            scrollY.value,
            [0, 100],
            [1, 0.5],
            Extrapolation.CLAMP
        );

        const translateY = interpolate(
            scrollY.value,
            [0, 100],
            [0, -20],
            Extrapolation.CLAMP
        );

        return {
            opacity,
            transform: [{scale}, {translateY}],
        };
    });

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <Text style={[styles.title, {color: colors.articleTitle}]}>News</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
});

export default NewsHeader;

