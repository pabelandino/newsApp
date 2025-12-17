import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {AppColors} from '@/constants/theme';

interface DeleteActionProps {
    onDelete: () => void;
}

const DeleteAction = ({onDelete}: DeleteActionProps) => {
    return (
        <TouchableOpacity
            style={styles.deleteButton}
            onPress={onDelete}
            activeOpacity={0.7}>
            <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    deleteButton: {
        position: 'absolute',
        right: -100,
        top: 0,
        bottom: 0,
        width: 100,
        backgroundColor: AppColors.deleteRed,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteText: {
        color: AppColors.deleteText,
        fontWeight: '600',
        fontSize: 14,
    },
});

export default DeleteAction;

