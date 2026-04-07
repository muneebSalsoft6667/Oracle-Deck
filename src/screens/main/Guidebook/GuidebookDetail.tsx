import React, { useMemo } from 'react';
import { View, ScrollView, Animated } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import useRTLStyles from './detailStyles';
import useIsRTL from '@/hooks/useIsRTL';
import WrapperContainer from '@/components/WrapperContainer';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import { MainStackParamList } from '@/navigation/types';

type GuidebookDetailRouteProp = RouteProp<MainStackParamList, 'GuidebookDetail'>;

interface ChapterContent {
    id: number;
    number: string;
    title: string;
    paragraphs: string[];
    quote: string;
}

const chapterContents: Record<number, ChapterContent> = {
    1: {
        id: 1,
        number: 'CHAPTER 1',
        title: 'The Origin of the Deck',
        paragraphs: [
            'The celestial path is not a straight line, but a spiral. As seekers, we often find ourselves returning to the same lessons, yet each time we are at a higher level of awareness. Understanding the celestial origins and the path of the seeker.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        ],
        quote: 'The oracle does not speak in absolutes, but in possibilities.',
    },
    2: {
        id: 2,
        number: 'CHAPTER 2',
        title: 'Cleansing Your Space',
        paragraphs: [
            'Before you begin any reading, it is essential to create a sacred space. This ritual prepares both your environment and your mind for the messages that await.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        ],
        quote: 'A clean space invites clear messages from the universe.',
    },
    3: {
        id: 3,
        number: 'CHAPTER 3',
        title: 'The Elemental Suits',
        paragraphs: [
            'Each suit in the deck represents one of the four elements: Earth, Air, Fire, and Water. Understanding these elements deepens your connection to the cards.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        ],
        quote: 'The elements speak through the cards, revealing the nature of all things.',
    },
    4: {
        id: 4,
        number: 'CHAPTER 4',
        title: 'Interpreting Reversed Cards',
        paragraphs: [
            'Reversed cards are not omens of doom, but invitations to look deeper. They reveal blockages, hidden aspects, and opportunities for growth.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        ],
        quote: 'In the shadows, we find the light that guides us forward.',
    },
};

const GuidebookDetail = () => {
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL);
    const route = useRoute<GuidebookDetailRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    const { chapterId } = route.params;

    const chapterContent = useMemo(() => {
        return chapterContents[chapterId] || chapterContents[1];
    }, [chapterId]);

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(30)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <WrapperContainer style={styles.container}>
            <HeaderComp showBack={true} title="" />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View
                    style={[
                        styles.content,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <View style={styles.header}>
                        <TextComp
                            isDynamic
                            text={`GUIDEBOOK • ${chapterContent.number}`}
                            style={styles.headerText}
                        />
                    </View>

                    <View style={styles.titleSection}>
                        <TextComp
                            isDynamic
                            text={chapterContent.title}
                            style={styles.title}
                        />
                    </View>

                    <View style={styles.paragraphContainer}>
                        <TextComp
                            isDynamic
                            text={chapterContent.paragraphs[0]}
                            style={styles.paragraph}
                        />
                    </View>

                    <View style={styles.paragraphContainer}>
                        <TextComp
                            isDynamic
                            text={chapterContent.paragraphs[1]}
                            style={styles.paragraph}
                        />
                    </View>

                    <View style={styles.quoteContainer}>
                        <TextComp
                            isDynamic
                            text={`"${chapterContent.quote}"`}
                            style={styles.quoteText}
                        />
                    </View>

                    <View style={styles.paragraphContainer}>
                        <TextComp
                            isDynamic
                            text={chapterContent.paragraphs[2]}
                            style={styles.paragraph}
                        />
                    </View>

                    <View style={styles.divider} />
                </Animated.View>
            </ScrollView>
        </WrapperContainer>
    );
};

export default GuidebookDetail;
