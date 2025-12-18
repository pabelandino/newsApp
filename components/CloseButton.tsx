import {Pressable, Text, StyleSheet} from 'react-native';
import {useRouter} from 'expo-router';
import {useAppColors} from '@/hooks/use-app-colors';

export const CloseButton = () => {
    const router = useRouter();
    const colors = useAppColors();

    return (
        <Pressable
            onPress={() => router.back()}
            style={styles.button}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Text style={[styles.text, {color: colors.headerText}]}>✕</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        alignContent: 'center',
        alignItems: 'center',
        minWidth: 44,
        minHeight: 44,
    },
    text: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600',
    },
});

