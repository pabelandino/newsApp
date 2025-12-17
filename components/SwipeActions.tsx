import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import Reanimated, {
    SharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';

interface SwipeActionProps {
    prog: SharedValue<number>;
    drag: SharedValue<number>;
    onPress: () => void;
    label: string;
    backgroundColor: string;
    textColor: string;
    offset: number;
}

export const SwipeAction = ({
    prog,
    drag,
    onPress,
    label,
    backgroundColor,
    textColor,
    offset,
}: SwipeActionProps) => {
    const styleAnimation = useAnimatedStyle(() => {
        const translateX = interpolate(
            prog.value,
            [0, 1],
            [offset, 0],
            Extrapolation.CLAMP
        );

        return {
            transform: [{translateX}],
        };
    });

    return (
        <Reanimated.View style={[styles.actionBox, {backgroundColor}, styleAnimation]}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onPress}
                style={styles.touchable}>
                <Text style={[styles.actionText, {color: textColor}]}>
                    {label}
                </Text>
            </TouchableOpacity>
        </Reanimated.View>
    );
};

const styles = StyleSheet.create({
    actionBox: {
        marginTop: 14,
        width: 100,
        height: '76%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionText: {
        fontWeight: '600',
        fontSize: 14,
    },
});

