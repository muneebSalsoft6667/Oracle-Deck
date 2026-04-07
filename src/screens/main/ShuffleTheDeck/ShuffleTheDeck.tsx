import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView, Animated, Dimensions } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useRTLStyles from './styles';
import useIsRTL from '@/hooks/useIsRTL';
import WrapperContainer from '@/components/WrapperContainer';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import ImageComp from '@/components/ImageComp';
import ButtonComp from '@/components/ButtonComp';
import { MainStackParamList } from '@/navigation/types';
import { fall, fall02, fall03, fall04, fall05 } from '@/assets/images';
import { moderateScale } from '@/styles/scaling';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type ShuffleTheDeckRouteProp = RouteProp<MainStackParamList, 'ShuffleTheDeck'>;

const ShuffleTheDeck = () => {
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL);
    const route = useRoute<ShuffleTheDeckRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    
    const readingTitle = route.params?.readingTitle || 'Daily Reflection';

    // Card images array
    const cardImages = [fall, fall02, fall03, fall04, fall05];
    const totalCards = 6; // Number of cards to display in the deck

    // State for card positions and order
    const [cardOrder, setCardOrder] = useState<number[]>([]);
    const [isShuffling, setIsShuffling] = useState(false);
    
    // Animation refs for each card
    const cardAnimations = useRef(
        Array.from({ length: totalCards }, () => ({
            translateX: new Animated.Value(0),
            translateY: new Animated.Value(0),
            rotate: new Animated.Value(0),
            scale: new Animated.Value(1),
            opacity: new Animated.Value(0),
        }))
    ).current;

    // Initialize card order
    useEffect(() => {
        const initialOrder = Array.from({ length: totalCards }, (_, i) => i % cardImages.length);
        setCardOrder(initialOrder);
        
        // Initial fade-in animation
        cardAnimations.forEach((anim, index) => {
            Animated.timing(anim.opacity, {
                toValue: 1,
                duration: 500,
                delay: index * 100,
                useNativeDriver: true,
            }).start();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleShuffle = () => {
        if (isShuffling) return;
        setIsShuffling(true);

        // Create shuffle animation with multiple steps
        const shuffleDuration = 2000;
        const shuffleSteps = 8;
        const allCardAnimations: Animated.CompositeAnimation[] = [];

        cardAnimations.forEach((anim) => {
            const stepAnimations: Animated.CompositeAnimation[] = [];
            
            for (let step = 0; step < shuffleSteps; step++) {
                const moveForward = Math.random() > 0.5;
                const forwardScale = 1.2 + Math.random() * 0.1;
                const backwardScale = 0.6 - Math.random() * 0.1;
                const targetScale = moveForward ? forwardScale : backwardScale;
                
                const baseY = 0;
                const forwardY = baseY - 50 - Math.random() * 20;
                const backwardY = baseY + 60 + Math.random() * 20;
                const targetY = moveForward ? forwardY : backwardY;
                
                const randomX = (Math.random() - 0.5) * 30;
                const stepDelay = (step * shuffleDuration) / shuffleSteps;
                
                const stepAnimation = Animated.sequence([
                    Animated.delay(stepDelay),
                    Animated.parallel([
                        Animated.timing(anim.scale, {
                            toValue: targetScale,
                            duration: 120,
                            useNativeDriver: true,
                        }),
                        Animated.timing(anim.translateY, {
                            toValue: targetY,
                            duration: 120,
                            useNativeDriver: true,
                        }),
                        Animated.timing(anim.translateX, {
                            toValue: randomX,
                            duration: 120,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.parallel([
                        Animated.timing(anim.scale, {
                            toValue: 1,
                            duration: 120,
                            useNativeDriver: true,
                        }),
                        Animated.timing(anim.translateY, {
                            toValue: 0,
                            duration: 120,
                            useNativeDriver: true,
                        }),
                        Animated.timing(anim.translateX, {
                            toValue: 0,
                            duration: 120,
                            useNativeDriver: true,
                        }),
                    ]),
                ]);
                
                stepAnimations.push(stepAnimation);
            }
            
            allCardAnimations.push(Animated.sequence(stepAnimations));
        });

        // Run all card animations in parallel
        Animated.parallel(allCardAnimations).start(() => {
            // After shuffle, randomly reorder the cards
            setCardOrder((prevOrder) => {
                const newOrder = [...prevOrder].sort(() => Math.random() - 0.5);
                return newOrder;
            });
            setIsShuffling(false);
        });
    };

    const handleDrawCards = () => {
        // Get the top card (index 0)
        const topCardIndex = cardOrder[0] % cardImages.length;
        const selectedCardImage = cardImages[topCardIndex];
        
        // Navigate to CardPosition with the selected card
        navigation.navigate('CardPosition', {
            position: 'POSITION 1: THE DAY AHEAD',
            cardImage: selectedCardImage,
            cardTitle: 'LOVE AND RELATIONSHIPS',
            cardSubtitle: 'Your partner may be more receptive to your ideas and needs.',
            cardDescription: 'It’s a good time to share your feelings and express your needs. Your partner may be more receptive to your ideas and needs.',
        });
    };

    // Calculate card positions for deck arrangement (centered)
    const getCardPosition = (index: number) => {
        const cardWidth = moderateScale(200);
        const offsetX = index * 8; // Horizontal offset for stacked effect
        const offsetY = index * 6; // Vertical offset for stacked effect
        const centerX = (SCREEN_WIDTH - cardWidth) / 2; // Properly centered
        
        return {
            left: centerX + offsetX,
            top: moderateScale(100) + offsetY,
            zIndex: totalCards - index,
        };
    };

    const rotateInterpolate = (index: number) => {
        return cardAnimations[index].rotate.interpolate({
            inputRange: [-1, 1],
            outputRange: ['-15deg', '15deg'],
        });
    };

    return (
        <WrapperContainer style={styles.container}>
            <HeaderComp showBack={true} title="" />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    {/* Title Section */}
                    <View style={styles.titleSection}>
                        <TextComp
                            isDynamic
                            text={readingTitle}
                            style={styles.title}
                        />
                        <TextComp
                            isDynamic
                            text="A single card for immediate guidance and focus for the day ahead."
                            style={styles.subtitle}
                        />
                    </View>

                    {/* Cards Deck Section */}
                    <View style={styles.cardsSection}>
                        {cardAnimations.map((anim, index) => {
                            const cardImageIndex = cardOrder[index] || (index % cardImages.length);
                            const position = getCardPosition(index);
                            
                            return (
                                <Animated.View
                                    key={index}
                                    style={[
                                        styles.cardContainer,
                                        {
                                            left: position.left,
                                            top: position.top,
                                            zIndex: position.zIndex,
                                            opacity: anim.opacity,
                                            transform: [
                                                { translateX: anim.translateX },
                                                { translateY: anim.translateY },
                                                { rotate: rotateInterpolate(index) },
                                                { scale: anim.scale },
                                            ],
                                        },
                                    ]}
                                >
                                    <View style={styles.card}>
                                        <ImageComp
                                            source={cardImages[cardImageIndex]}
                                            width={moderateScale(200)}
                                            height={moderateScale(280)}
                                            borderRadius={moderateScale(16)}
                                            resizeMode="cover"
                                        />
                                    </View>
                                </Animated.View>
                            );
                        })}
                    </View>

                    {/* Buttons Section */}
                    <View style={styles.buttonsSection}>
                        <ButtonComp
                            title="SHUFFLE THE DECK"
                            onPress={handleShuffle}
                            disabled={isShuffling}
                            width="100%"
                          
                        />
                        <ButtonComp
                            title="DRAW CARDS"
                            onPress={handleDrawCards}
                            width="100%"
                            style={styles.drawButton}
                            textStyle={styles.drawButtonText}
                        />
                    </View>
                </View>
            </ScrollView>
        </WrapperContainer>
    );
};

export default ShuffleTheDeck;
