import React, { useRef, useState } from 'react';
import {
    View,
    FlatList,
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import WrapperContainer from '@/components/WrapperContainer';
import ButtonComp from '@/components/ButtonComp';
import TextComp from '@/components/TextComp';
import ImageComp from '@/components/ImageComp';
import useIsRTL from '@/hooks/useIsRTL';
import { RootStackParamList } from '@/navigation/types';
import { useTheme } from '@/context/ThemeContext';
import { secureStorage } from '@/utils/secureStorage';
import useRTLStyles from './styles';
import fontFamily from '@/styles/fontFamily';
// Import placeholder images - replace with actual onboarding images when available
import { fall, fall02, fall03 } from '@/assets/images';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface OnboardingSlide {
    id: number;
    image: any; // Will be require() for local images
    title: string;
    description: string;
    buttonText: string;
}

const onboardingData: OnboardingSlide[] = [
    {
        id: 1,
        image: fall, // TODO: Replace with onboarding1.png when available
        title: 'Your Spiritual Compass',
        description: "Navigate life's questions with ancient wisdom & modern reflection. Find clarity in every card.",
        buttonText: 'BEGIN YOUR JOURNEY',
    },
    {
        id: 2,
        image: fall02, // TODO: Replace with onboarding2.png when available
        title: 'Meaningful Rituals',
        description: "Navigate life's questions with ancient wisdom & modern reflection. Find clarity in every card.",
        buttonText: 'LEARN HOW IT WORK',
    },
    {
        id: 3,
        image: fall03, // TODO: Replace with onboarding3.png when available
        title: 'Unlock Full Clarity',
        description: 'Start your 7-day free trial to access the complete guidebook and unlimited daily readings.',
        buttonText: 'GET STARTED',
    },
];

const OnBoard = () => {
    const isRTL = useIsRTL();
    const { theme } = useTheme();
    const styles = useRTLStyles(isRTL, theme);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / SCREEN_WIDTH);
        if (index !== currentIndex && index >= 0 && index < onboardingData.length) {
            setCurrentIndex(index);
        }
    };

    const handleNext = () => {
        if (currentIndex < onboardingData.length - 1) {
            const nextIndex = currentIndex + 1;
            flatListRef.current?.scrollToIndex({ 
                index: nextIndex, 
                animated: true 
            });
        } else {
            handleFinish();
        }
    };

    const handleSkip = async () => {
        await secureStorage.setItem('HAS_SEEN_ONBOARDING', 'true');
        navigation.replace('Auth');
    };

    const handleFinish = async () => {
        await secureStorage.setItem('HAS_SEEN_ONBOARDING', 'true');
        navigation.replace('Auth');
    };

    const renderSlide = ({ item, index }: { item: OnboardingSlide; index: number }) => {
        return (
            <View style={styles.slideContainer}>
                {/* Image Section - Top 60% */}
                <View style={styles.imageContainer}>
                    <ImageComp
                        source={item.image}
                        width="100%"
                        height="100%"
                        resizeMode="cover"
                    />
                </View>

                {/* Content Section - Bottom 40% */}
                <View style={styles.contentContainer}>
                    {/* Pagination Dots */}
                    <View style={styles.dotsContainer}>
                        {onboardingData.map((_, dotIndex) => (
                            <View
                                key={dotIndex}
                                style={[
                                    styles.dot,
                                    dotIndex === index && styles.dotActive,
                                ]}
                            />
                        ))}
                    </View>

                    <TextComp
                        isDynamic
                        style={styles.title}
                        text={item.title}
                    />

                    <TextComp
                        isDynamic
                        style={styles.description}
                        text={item.description}
                    />

                    {/* Button */}
                    <ButtonComp
                        onPress={handleNext}
                        title={item.buttonText}
                        // style={styles.button}
                    />

                    {/* Skip Link */}
                    {index === onboardingData.length - 1 ? null : (
                        <TouchableOpacity
                            onPress={handleSkip}
                            style={styles.skipButton}
                            activeOpacity={0.7}
                        >
                            <TextComp
                                isDynamic
                                style={styles.skipText}
                                text="SKIP"
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    return (
        <WrapperContainer style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={onboardingData}
                renderItem={renderSlide}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                getItemLayout={(_, index) => ({
                    length: SCREEN_WIDTH,
                    offset: SCREEN_WIDTH * index,
                    index,
                })}
                onScrollToIndexFailed={(info) => {
                    const wait = new Promise(resolve => setTimeout(resolve, 300));
                    wait.then(() => {
                        flatListRef.current?.scrollToIndex({ 
                            index: info.index, 
                            animated: false 
                        });
                    });
                }}
                decelerationRate="fast"
                snapToInterval={SCREEN_WIDTH}
                snapToAlignment="start"
            />
        </WrapperContainer>
    );
};

export default OnBoard;
