import React, { useRef, useState } from 'react';
import { View, ScrollView, Animated, TextInput } from 'react-native';
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
import { fall } from '@/assets/images';
import useIsRTL from '@/hooks/useIsRTL';
import { moderateScale } from '@/styles/scaling';
import useRTLStyles from './styles';

type CreateJournalRouteProp = RouteProp<MainStackParamList, 'CreateJournal'>;

// Default card data (can be overridden by navigation params)
const defaultCardData = {
    cardImage: fall,
    cardTitle: 'WISDOM',
    category: 'CLARITY & VISION',
    title: 'The Inner Light',
    description: "The light within you is ready to shine. Trust your intuition & move forward with confidence.",
    keywords: ['INTUITION', 'CLARITY', 'GROWTH', 'VISION'],
    coreMessage: "The light within you is ready to shine. Trust your intuition and move forward with confidence.",
    extendedMeaning: "This card appears when you are on the threshold of a significant internal shift. The The Inner Light represents the integration of shadow and light, reminding you that your past experiences are the soil from which your future wisdom grows. Do not rush the process; the lotus blooms in its own time.",
    dailyAffirmation: "I trust the unfolding of my journey and embrace the wisdom found in every moment.",
};

const CreateJournal = () => {
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL);
    const route = useRoute<CreateJournalRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    
    // Use route params if available, otherwise use default data
    const cardData = route.params || defaultCardData;
    
    const [personalNotes, setPersonalNotes] = useState('');
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
            <HeaderComp showBack={true} title="Sacred Detail" />
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
                    {/* Card Image Section */}
                    <View style={styles.cardImageContainer}>
                        <View style={styles.cardWrapper}>
                            <ImageComp
                                source={cardData.cardImage || fall}
                                width="100%"
                                height={moderateScale(320)}
                                borderRadius={moderateScale(20)}
                                resizeMode="cover"
                            />
                            {/* Card Title Overlay */}
                            <View style={styles.cardTitleOverlay}>
                                <TextComp
                                    isDynamic
                                    text={cardData.cardTitle || 'WISDOM'}
                                    style={styles.cardTitleText}
                                />
                            </View>
                            {/* Banner Text */}
                            <View style={styles.bannerContainer}>
                                <TextComp
                                    isDynamic
                                    text="SHARE YOUR WISDOM"
                                    style={styles.bannerText}
                                />
                            </View>
                        </View>
                    </View>

                    {/* First Text Block */}
                    <View style={styles.textBlock}>
                        <TextComp
                            isDynamic
                            text={cardData.category || 'CLARITY & VISION'}
                            style={styles.categoryLabel}
                        />
                        <TextComp
                            isDynamic
                            text={cardData.title || 'The Inner Light'}
                            style={styles.titleText}
                        />
                        <TextComp
                            isDynamic
                            text={cardData.description || defaultCardData.description}
                            style={styles.descriptionText}
                        />
                    </View>

                    {/* Keywords Section */}
                    <View style={styles.keywordsSection}>
                        <TextComp
                            isDynamic
                            text={cardData.category || 'CLARITY & VISION'}
                            style={styles.categoryLabel}
                        />
                        <TextComp
                            isDynamic
                            text={cardData.title || 'The Inner Light'}
                            style={styles.titleText}
                        />
                        <View style={styles.keywordsContainer}>
                            {(cardData.keywords || defaultCardData.keywords).map((keyword, index) => (
                                <View key={index} style={styles.keywordItem}>
                                    <TextComp
                                        isDynamic
                                        text={keyword}
                                        style={styles.keywordText}
                                    />
                                </View>
                            ))}
                        </View>
                        <View style={styles.separatorLine} />
                    </View>

                    {/* Core Message Section */}
                    <View style={styles.section}>
                        <TextComp
                            isDynamic
                            text="Core Message"
                            style={styles.sectionTitle}
                        />
                        <TextComp
                            isDynamic
                            text={`"${cardData.coreMessage || defaultCardData.coreMessage}"`}
                            style={styles.sectionContent}
                        />
                    </View>

                    {/* Extended Meaning Section */}
                    <View style={styles.section}>
                        <TextComp
                            isDynamic
                            text="Extended Meaning"
                            style={styles.sectionTitle}
                        />
                        <TextComp
                            isDynamic
                            text={cardData.extendedMeaning || defaultCardData.extendedMeaning}
                            style={styles.sectionContent}
                        />
                    </View>

                    {/* Daily Affirmation Section */}
                    <View style={styles.section}>
                        <TextComp
                            isDynamic
                            text="DAILY AFFIRMATION"
                            style={styles.affirmationTitle}
                        />
                        <TextComp
                            isDynamic
                            text={`"${cardData.dailyAffirmation || defaultCardData.dailyAffirmation}"`}
                            style={styles.sectionContent}
                        />
                    </View>

                    {/* Personal Notes Section */}
                    <View style={styles.section}>
                        <TextComp
                            isDynamic
                            text="Personal Notes"
                            style={styles.sectionTitle}
                        />
                        <TextInput
                            style={styles.notesInput}
                            placeholder="Enter your Reflections"
                            placeholderTextColor="#9E9E9E"
                            multiline
                            numberOfLines={8}
                            value={personalNotes}
                            onChangeText={setPersonalNotes}
                            textAlignVertical="top"
                        />
                    </View>

                    {/* Save Button */}
                    <ButtonComp
                        title="SAVE TO JOURNAL"
                        onPress={handleSaveToJournal}
                        style={styles.saveButton}
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
                        style={styles.modalButton}
                    />
                </View>
            </Modal>
        </WrapperContainer>
    );
};

export default CreateJournal;
