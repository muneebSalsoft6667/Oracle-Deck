import React from 'react';
import { View, ScrollView, Pressable, Animated } from 'react-native';
import useRTLStyles from './styles';
import useIsRTL from '@/hooks/useIsRTL';
import WrapperContainer from '@/components/WrapperContainer';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import { bookIcon, ArrowRightIcon } from '@/assets/icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '@/navigation/types';
import { useNavigation } from '@react-navigation/native';

interface ReadingOption {
    id: number;
    title: string;
    subtitle: string;
    cardCount: number;
}

const readingOptions: ReadingOption[] = [
    {
        id: 1,
        title: 'Daily Reflection',
        subtitle: '1 Card Reading',
        cardCount: 1,
    },
    {
        id: 2,
        title: 'Temporal Path',
        subtitle: '3 Card Reading',
        cardCount: 3,
    },
    {
        id: 3,
        title: 'Spiritual Compass',
        subtitle: '7 Card Reading',
        cardCount: 7,
    },
];

const quote = "The cards don't tell the future, they reveal the present moment's potential.";

const ShuffleandDraw = () => {
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL);
    const quoteOpacityAnim = React.useRef(new Animated.Value(0)).current;
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    React.useEffect(() => {
        Animated.timing(quoteOpacityAnim, {
            toValue: 1,
            duration: 600,
            delay: 400,
            useNativeDriver: true,
        }).start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleReadingPress = (reading: ReadingOption) => {
        navigation.navigate('ShuffleTheDeck', {
            readingTitle: reading.title,
            cardCount: reading.cardCount,
        });
    };

    return (
        <WrapperContainer style={styles.container}>
            <HeaderComp showBack={true} title="Choose a Spread" />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    {readingOptions.map((reading, index) => (
                        <ReadingCard
                            key={reading.id}
                            reading={reading}
                            onPress={() => handleReadingPress(reading)}
                            delay={index * 100}
                        />
                    ))}

                    <Animated.View
                        style={[
                            styles.quoteContainer,
                            {
                                opacity: quoteOpacityAnim,
                            },
                        ]}
                    >
                        <TextComp
                            isDynamic
                            text={`"${quote}"`}
                            style={styles.quoteText}
                        />
                    </Animated.View>
                </View>
            </ScrollView>
        </WrapperContainer>
    );
};

interface ReadingCardProps {
    reading: ReadingOption;
    onPress: () => void;
    delay: number;
}

const ReadingCard: React.FC<ReadingCardProps> = ({ reading, onPress, delay }) => {
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL);
    const scaleAnim = React.useRef(new Animated.Value(1)).current;
    const opacityAnim = React.useRef(new Animated.Value(0)).current;
    const translateYAnim = React.useRef(new Animated.Value(20)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 400,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 400,
                delay: delay,
                useNativeDriver: true,
            }),
        ]).start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delay]);

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
    const ArrowIcon = ArrowRightIcon;

    return (
        <Animated.View
            style={[
                styles.cardContainer,
                {
                    opacity: opacityAnim,
                    transform: [
                        { scale: scaleAnim },
                        { translateY: translateYAnim },
                    ],
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
                    <View style={styles.iconBackground}>
                        <BookIcon width={20} height={20} color="#9E9E9E" />
                    </View>
                </View>
                <View style={styles.cardContent}>
                    <TextComp
                        isDynamic
                        text={reading.title}
                        style={styles.cardTitle}
                    />
                    <TextComp
                        isDynamic
                        text={reading.subtitle}
                        style={styles.cardSubtitle}
                    />
                </View>
                <View style={styles.arrowContainer}>
                    <ArrowIcon width={20} height={20} color="#9E9E9E" />
                </View>
            </Pressable>
        </Animated.View>
    );
};

export default ShuffleandDraw;
