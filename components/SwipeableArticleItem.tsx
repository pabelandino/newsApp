import ArticleDetails from '@/components/ArticleDetails';
import { SwipeAction } from '@/components/SwipeActions';
import { useAppColors } from '@/hooks/use-app-colors';
import { Article } from '@/models/articles';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import ReanimatedSwipeable, {
    SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import { SharedValue } from 'react-native-reanimated';

interface SwipeableArticleItemProps {
    article: Article;
    onDelete: (article: Article) => void;
    onToggleFavorite: (article: Article) => void;
    isFavorite: boolean;
}

const SwipeableArticleItem = ({
    article,
    onDelete,
    onToggleFavorite,
    isFavorite,
}: SwipeableArticleItemProps) => {
    const swipeableRef = useRef<SwipeableMethods>(null);
    const colors = useAppColors();

    const handleDelete = () => {
        onDelete(article);
        swipeableRef.current?.close();
    };

    const handleToggleFavorite = () => {
        onToggleFavorite(article);
        swipeableRef.current?.close();
    };

    const renderRightActions = (prog: SharedValue<number>, drag: SharedValue<number>) => {
        return (
            <>
                <SwipeAction
                    prog={prog}
                    drag={drag}
                    onPress={handleToggleFavorite}
                    label={isFavorite ? 'Unfav' : 'Fav'}
                    backgroundColor={isFavorite ? colors.favoriteOrange : colors.pulseGreen}
                    textColor={colors.deleteText}
                    offset={0}
                />
                <SwipeAction
                    prog={prog}
                    drag={drag}
                    onPress={handleDelete}
                    label="Delete"
                    backgroundColor={colors.deleteRed}
                    textColor={colors.deleteText}
                    offset={100}
                />
            </>
        );
    };

    return (
        <ReanimatedSwipeable
            ref={swipeableRef}
            containerStyle={styles.container}
            friction={2}
            rightThreshold={50}
            enableTrackpadTwoFingerGesture
            renderRightActions={renderRightActions}>
            <ArticleDetails article={article} />
        </ReanimatedSwipeable>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    actionsContainer: {
        flexDirection: 'row',
        width: 200, // Total width for both actions (100px each)
    },
});

export default SwipeableArticleItem;

