import React, { useMemo, useState } from 'react';
import { View, ScrollView, Animated, Pressable, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Modal from 'react-native-modal';
import WrapperContainer from '@/components/WrapperContainer';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import ImageComp from '@/components/ImageComp';
import { MainStackParamList } from '@/navigation/types';
import { BackArrowIcon, binIcon as BinIcon } from '@/assets/icons';
import { fall, fall02, fall03, fall04 } from '@/assets/images';
import useIsRTL from '@/hooks/useIsRTL';
import { moderateScale } from '@/styles/scaling';
import fontFamily from '@/styles/fontFamily';
import { commonColors } from '@/styles/colors';
import useRTLStyles from './journalDetailsStyles';

type JournalHistoryDetailsRouteProp = RouteProp<MainStackParamList, 'JournalHistoryDetails'>;

interface CardData {
    id: string;
    image: number;
    title: string;
    quote: string;
}

interface JournalEntry {
    id: string;
    title: string;
    date: string;
    cards: CardData[];
}

const journalEntries: Record<string, JournalEntry> = {
    'journal-1': {
        id: 'journal-1',
        title: 'Daily Reflection',
        date: 'Jan 31, 2026',
        cards: [
            {
                id: 'card-1',
                image: fall,
                title: 'The Inner Light',
                quote: 'Trust in the path that unfolds before you. This card signifies a moment of deep introspection and clarity.',
            },
        ],
    },
    'journal-2': {
        id: 'journal-2',
        title: 'Temporal Path',
        date: 'Feb 05, 2026',
        cards: [
            {
                id: 'card-1',
                image: fall04,
                title: 'Deep Roots',
                quote: 'Trust in the path that unfolds before you. This card signifies a moment of deep introspection and clarity.',
            },
            {
                id: 'card-2',
                image: fall02,
                title: 'Cosmic Breath',
                quote: 'Trust in the path that unfolds before you. This card signifies a moment of deep introspection and clarity.',
            },
            {
                id: 'card-3',
                image: fall03,
                title: 'Eternal Flame',
                quote: 'Trust in the path that unfolds before you. This card signifies a moment of deep introspection and clarity.',
            },
        ],
    },
};

const JournalHistoryDetails = () => {
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL);
    const route = useRoute<JournalHistoryDetailsRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    const { journalId } = route.params;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const journalEntry = useMemo(() => {
        return journalEntries[journalId] || journalEntries['journal-1'];
    }, [journalId]);

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

    const handleDelete = () => {
        setIsDeleteModalVisible(false);
        // Navigate back after deletion
        setTimeout(() => {
            navigation.goBack();
        }, 300);
    };

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    activeOpacity={0.7}
                >
                    <View style={styles.iconButton}>
                        <BackArrowIcon width={20} height={20} />
                    </View>
                </TouchableOpacity>
                <View style={styles.dateContainer}>
                    <TextComp isDynamic text={journalEntry.date} style={styles.dateText} />
                </View>
                <TouchableOpacity
                    onPress={() => setIsDeleteModalVisible(true)}
                    style={styles.deleteButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    activeOpacity={0.7}
                >
                    <View style={styles.iconButton}>
                        <BinIcon width={20} height={20} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const renderSingleCard = (card: CardData) => {
        return (
            <View style={styles.singleCardContainer}>
                <View style={styles.cardImageContainer}>
                    <ImageComp
                        source={card.image}
                        width={moderateScale(100)}
                        height={moderateScale(150)}
                        borderRadius={moderateScale(16)}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.cardDescriptionContainer}>
                    <TextComp isDynamic text="CARD" style={styles.cardLabel} />
                    <TextComp isDynamic text={card.title} style={styles.cardTitle} />
                    <TextComp isDynamic text={`"${card.quote}"`} style={styles.cardQuote} />
                </View>
            </View>
        );
    };

    const renderMultipleCards = () => {
        return (
            <View style={styles.multipleCardsContainer}>
                {journalEntry.cards.map((card, index) => (
                    <View key={card.id} style={styles.cardRow}>
                        <View style={styles.cardImageContainer}>
                            <ImageComp
                                source={card.image}
                                width={moderateScale(100)}
                                height={moderateScale(130)}
                                borderRadius={moderateScale(16)}
                                resizeMode="cover"
                            />
                        </View>
                        <View style={styles.cardDescriptionContainer}>
                            <TextComp isDynamic text={`CARD ${index + 1}`} style={styles.cardLabel} />
                            <TextComp isDynamic text={card.title} style={styles.cardTitle} />
                            <TextComp isDynamic text={`"${card.quote}"`} style={styles.cardQuote} />
                        </View>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <WrapperContainer style={styles.container}>
            {renderHeader()}
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
                    <View style={styles.titleSection}>
                        <TextComp isDynamic text={journalEntry.title} style={styles.title} />
                        <TextComp
                            isDynamic
                            text="A reflection recorded in your spiritual archive."
                            style={styles.subtitle}
                        />
                    </View>

                    {journalEntry.cards.length === 1
                        ? renderSingleCard(journalEntry.cards[0])
                        : renderMultipleCards()}
                </Animated.View>
            </ScrollView>

            {/* Delete Modal */}
            <Modal
                isVisible={isDeleteModalVisible}
                onBackdropPress={() => setIsDeleteModalVisible(false)}
                onBackButtonPress={() => setIsDeleteModalVisible(false)}
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
                    <View style={styles.modalIconCircle}>
                        <BinIcon width={24} height={24} />
                    </View>
                    </View>
                    <TextComp isDynamic text="Delete Entry?" style={styles.modalTitle} />
                    <TextComp
                        isDynamic
                        text="This will permanently remove this reading from your spiritual history."
                        style={styles.modalDescription}
                    />
                    <Pressable
                        onPress={handleDelete}
                        style={styles.deleteButtonModal}
                        android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
                    >
                        <TextComp isDynamic text="DELETE FOREVER" style={styles.deleteButtonText} />
                    </Pressable>
                    <Pressable
                        onPress={() => setIsDeleteModalVisible(false)}
                        style={styles.keepItButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <TextComp isDynamic text="KEEP IT" style={styles.keepItText} />
                    </Pressable>
                </View>
            </Modal>
        </WrapperContainer>
    );
};

export default JournalHistoryDetails;
