import React, { useRef } from 'react';
import { View, ScrollView, Animated } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import WrapperContainer from '@/components/WrapperContainer';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import ImageComp from '@/components/ImageComp';
import ButtonComp from '@/components/ButtonComp';
import { MainStackParamList } from '@/navigation/types';
import useIsRTL from '@/hooks/useIsRTL';
import { moderateScale } from '@/styles/scaling';
import useRTLStyles from './cardPositionStyles';

type CardPositionRouteProp = RouteProp<MainStackParamList, 'CardPosition'>;

const CardPosition = () => {
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL);
    const route = useRoute<CardPositionRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    
    const { position, cardImage, cardTitle, cardSubtitle, cardDescription } = route.params;

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleViewFullInterpretation = () => {
        navigation.navigate('FullInterpretation', {
            readingTitle: 'The Sacred Thread',
            cardImage: cardImage,
            cardTitle: cardTitle,
            cardDescription: cardDescription,
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
                <Animated.View
                    style={[
                        styles.content,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    {/* Position Title */}
                    <View style={styles.positionTitleContainer}>
                        <TextComp isDynamic text={position} style={styles.positionTitle} />
                    </View>

                    {/* Card Container */}
                    <View style={styles.cardWrapper}>
                        <View style={styles.cardContainer}>
                            <ImageComp
                                source={cardImage}
                                width={moderateScale(280)}
                                height={moderateScale(420)}
                                borderRadius={moderateScale(20)}
                                resizeMode="cover"
                            />
                            
                            {/* Card Text Overlay */}
                            <View style={styles.cardTextOverlay}>
                                <TextComp isDynamic text={cardSubtitle} style={styles.cardSubtitle} />
                                <TextComp isDynamic text={cardTitle} style={styles.cardTitleText} />
                                <TextComp isDynamic text={cardDescription} style={styles.cardDescription} />
                            </View>
                        </View>
                    </View>

                    {/* View Full Interpretation Button */}
                    <ButtonComp
                        title="VIEW FULL INTERPRETATION"
                        onPress={handleViewFullInterpretation}
                       
                    />
                </Animated.View>
            </ScrollView>
        </WrapperContainer>
    );
};

export default CardPosition;
