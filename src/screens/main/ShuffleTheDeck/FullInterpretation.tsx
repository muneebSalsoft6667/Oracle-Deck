import React, { useRef, useState } from 'react';
import { View, ScrollView, Animated } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import WrapperContainer from '@/components/WrapperContainer';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import ImageComp from '@/components/ImageComp';
import ButtonComp from '@/components/ButtonComp';
import { MainStackParamList } from '@/navigation/types';
import { TickIcon } from '@/assets/icons';
import useIsRTL from '@/hooks/useIsRTL';
import { moderateScale } from '@/styles/scaling';
import useRTLStyles from './fullInterpretationStyles';

type FullInterpretationRouteProp = RouteProp<MainStackParamList, 'FullInterpretation'>;

const FullInterpretation = () => {
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL);
    const route = useRoute<FullInterpretationRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    
    const { readingTitle, cardImage, cardTitle, cardDescription } = route.params;
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

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

    const handleSaveToJournal = () => {
        setIsSuccessModalVisible(true);
    };

    const handleBackToHomepage = () => {
        setIsSuccessModalVisible(false);
        // Navigate back to MainTabs (Home tab)
        navigation.navigate('MainTabs', { screen: 'Home' });
    };

    const getCurrentDate = () => {
        const date = new Date();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
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
                    {/* Title Section */}
                    <View style={styles.titleSection}>
                        <TextComp isDynamic text={readingTitle} style={styles.title} />
                        <TextComp isDynamic text="Reading Completed" style={styles.subtitle} />
                    </View>

                    {/* Card and Interpretation Section */}
                    <View style={styles.cardInterpretationContainer}>
                        {/* Card Image */}
                        <View style={styles.cardContainer}>
                            <ImageComp
                                source={cardImage}
                                width={moderateScale(140)}
                                height={moderateScale(200)}
                                borderRadius={moderateScale(16)}
                                resizeMode="cover"
                            />
                        </View>

                        {/* Interpretation Text */}
                        <View style={styles.interpretationContainer}>
                            <TextComp isDynamic text="CARD" style={styles.cardLabel} />
                            <TextComp isDynamic text={cardTitle} style={styles.cardTitle} />
                            <TextComp isDynamic text={cardDescription} style={styles.interpretationText} />
                        </View>
                    </View>

                    {/* Save to Journal Button */}
                    <ButtonComp
                        title="SAVE TO MY JOURNAL"
                        onPress={handleSaveToJournal}
                       
                    />
                </Animated.View>
            </ScrollView>

            {/* Success Modal */}
            <Modal
                isVisible={isSuccessModalVisible}
                onBackdropPress={() => setIsSuccessModalVisible(false)}
                onBackButtonPress={() => setIsSuccessModalVisible(false)}
                backdropOpacity={0.5}
                animationIn="fadeIn"
                animationOut="fadeOut"
                backdropTransitionOutTiming={300}
                animationInTiming={300}
                animationOutTiming={300}
                useNativeDriver
                style={styles.modal}
                statusBarTranslucent
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalIconContainer}>
                            <LottieView
                                source={TickIcon}
                                autoPlay
                                loop={false}
                                style={styles.lottieIcon}
                            />
                    </View>
                    <TextComp isDynamic text="Reading Sacredly Saved!" style={styles.modalTitle} />
                    <TextComp
                        isDynamic
                        text={`Your reading from ${getCurrentDate()} has been recorded in your spiritual archive.`}
                        style={styles.modalDescription}
                    />
                    <ButtonComp
                        title="BACK TO HOMEPAGE"
                        onPress={handleBackToHomepage}
                       
                    />
                </View>
            </Modal>
        </WrapperContainer>
    );
};

export default FullInterpretation;
