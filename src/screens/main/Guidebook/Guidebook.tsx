import React from 'react';
import { View, ScrollView, Pressable, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useRTLStyles from './styles';
import useIsRTL from '@/hooks/useIsRTL';
import WrapperContainer from '@/components/WrapperContainer';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import { MainStackParamList } from '@/navigation/types';
import { bookIcon } from '@/assets/icons';

interface Chapter {
    id: number;
    number: string;
    title: string;
    description: string;
}

const chapters: Chapter[] = [
    {
        id: 1,
        number: 'CHAPTER 1',
        title: 'The Origin of the Deck',
        description: 'Understanding the celestial origins & the path of the seeker.',
    },
    {
        id: 2,
        number: 'CHAPTER 2',
        title: 'Cleansing Your Space',
        description: 'Rituals for preparing your environment before a reading.',
    },
    {
        id: 3,
        number: 'CHAPTER 3',
        title: 'The Elemental Suits',
        description: 'Exploring Earth, Air, Fire, and Water within the cards.',
    },
    {
        id: 4,
        number: 'CHAPTER 4',
        title: 'Interpreting Reversed Cards',
        description: 'Finding light in the shadows and understanding blockages.',
    },
];

const Guidebook = () => {
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL);
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

    const handleChapterPress = (chapter: Chapter) => {
        navigation.navigate('GuidebookDetail', { chapterId: chapter.id });
    };

    return (
        <WrapperContainer style={styles.container}>
            <HeaderComp showBack={true} title="Guidebook" />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    {chapters.map((chapter, index) => (
                        <ChapterCard
                            key={chapter.id}
                            chapter={chapter}
                            onPress={() => handleChapterPress(chapter)}
                            delay={index * 100}
                        />
                    ))}
                </View>
            </ScrollView>
        </WrapperContainer>
    );
};

interface ChapterCardProps {
    chapter: Chapter;
    onPress: () => void;
    delay: number;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, onPress, delay }) => {
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL);
    const scaleAnim = React.useRef(new Animated.Value(1)).current;
    const opacityAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 400,
            delay: delay,
            useNativeDriver: true,
        }).start();
    }, []);

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.98,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const BookIcon = bookIcon;

    return (
        <Animated.View
            style={[
                styles.cardContainer,
                {
                    opacity: opacityAnim,
                    transform: [{ scale: scaleAnim }],
                },
            ]}
        >
            <Pressable
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styles.card}
            >
                <View style={styles.cardIconContainer}>
                    <BookIcon width={24} height={24} color="#9E9E9E" />
                </View>
                <View style={styles.cardContent}>
                    <TextComp
                        isDynamic
                        text={chapter.number}
                        style={styles.chapterNumber}
                    />
                    <TextComp
                        isDynamic
                        text={chapter.title}
                        style={styles.chapterTitle}
                    />
                    <TextComp
                        isDynamic
                        text={chapter.description}
                        style={styles.chapterDescription}
                    />
                </View>
            </Pressable>
        </Animated.View>
    );
};

export default Guidebook;
