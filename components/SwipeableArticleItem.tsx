import {View, StyleSheet} from 'react-native';
import ReanimatedSwipeable, {
    SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import {useRef} from 'react';
import {Article} from '@/models/articles';
import ArticleDetails from '@/components/ArticleDetails';
import {AppColors} from '@/constants/theme';

interface SwipeableArticleItemProps {
    article: Article;
    onDelete: (article: Article) => void;
}

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>, onDelete: () => void) {
    const styleAnimation = useAnimatedStyle(() => {
        return {
            transform: [{translateX: drag.value + 100}],
        };
    });

    return (
        <Reanimated.View style={[styles.deleteBox, styleAnimation]}>
            <Reanimated.Text style={styles.deleteText}>Delete</Reanimated.Text>
        </Reanimated.View>
    );
}

const SwipeableArticleItem = ({article, onDelete}: SwipeableArticleItemProps) => {
    const swipeableRef = useRef<SwipeableMethods>(null);

    const handleDelete = () => {
        onDelete(article);
    };

    const renderRightActions = (prog: SharedValue<number>, drag: SharedValue<number>) => {
        return RightAction(prog, drag, handleDelete);
    };

    return (
        <ReanimatedSwipeable
            ref={swipeableRef}
            containerStyle={styles.container}
            friction={2}
            rightThreshold={50}
            enableTrackpadTwoFingerGesture
            renderRightActions={renderRightActions}
            onSwipeableWillOpen={() => {
                // Optional: handle when swipe starts
            }}
            onSwipeableOpen={() => {
                // Trigger delete after swipe opens
                setTimeout(() => {
                    handleDelete();
                }, 300);
            }}>
            <ArticleDetails article={article}/>
        </ReanimatedSwipeable>
    );
};

const styles = StyleSheet.create({
    container: {},
    deleteBox: {
        marginTop: 10,
        width: 100,
        height: '80%',
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

export default SwipeableArticleItem;

