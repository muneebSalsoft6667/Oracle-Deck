import { GuidebookIcon, ShuffleIcon } from '@/assets/icons';
import { ProfileImage, fall, fall02, fall03, fall04, fall05 } from '@/assets/images';
import HeaderComp from '@/components/HeaderComp';
import ImageComp from '@/components/ImageComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import { useTheme } from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import { MainStackParamList, MainTabParamList } from '@/navigation/types';
import actions from '@/redux/actions';
import { commonColors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, RefreshControl, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ApiResponse } from './home.types';
import useRTLStyles from './styles';

interface Character {
    id: number;
    name: string;
    status: string;
    image: string;
}

interface ReflectionCard {
    id: number | string;
    title: string;
    badge: string;
    image: string | number;
}

interface RecentInsightCard {
    id: number | string;
    title: string;
    image: string | number;
}

const Home = () => {
    const navigation = useNavigation<
        CompositeNavigationProp<
            BottomTabNavigationProp<MainTabParamList>,
            NativeStackNavigationProp<MainStackParamList>
        >
    >();
    const isRTL = useIsRTL();
    const { theme } = useTheme();
    const styles = useRTLStyles(isRTL, theme);

    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async (pageNumber: number) => {
        try {
            const response = (await actions.getHomeData(`?page=${pageNumber}`)) as unknown as ApiResponse;
            if (response?.results) {
                setCharacters(response.results);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData(1);
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData(1);
    };

    const getCurrentDate = () => {
        const date = new Date();
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const month = months[date.getMonth()];
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    };

    const reflectionImages = useMemo<(number | string)[]>(() => [fall, fall02, fall03, fall04, fall05], []);

    const reflectionCards = useMemo<ReflectionCard[]>(() => {
        return reflectionImages.map((image, index) => {
            const character = characters[index];
            return {
                id: character?.id ?? `reflection-${index}`,
                title: character?.name ?? `Reflection ${index + 1}`,
                badge: index % 2 === 0 ? 'DAILY DRAW' : 'GUIDEBOOK',
                image,
            };
        });
    }, [characters, reflectionImages]);

    const recentInsights = useMemo<RecentInsightCard[]>(() => {
        return reflectionImages.map((image, index) => {
            const character = characters[index];
            return {
                id: character?.id ?? `recent-${index}`,
                title: character?.name ?? `Insight ${index + 1}`,
                image,
            };
        });
    }, [characters, reflectionImages]);

    const renderRecentItem = useCallback(({ item, index }: { item: RecentInsightCard; index: number }) => {
        const source = typeof item.image === 'string' ? { uri: item.image } : item.image;
        return (
            <TouchableOpacity activeOpacity={0.85} style={styles.recentItemCard}>
                <ImageComp
                    source={source}
                    width={46}
                    height={46}
                    borderRadius={12}
                />
                <View style={styles.recentTextBlock}>
                    <TextComp isDynamic text={item.title} style={styles.recentItemTitle} numberOfLines={1} />
                    <TextComp
                        isDynamic
                        text={`${index + 2} days ago - Single Card`}
                        style={styles.recentItemMeta}
                        numberOfLines={1}
                    />
                </View>
            </TouchableOpacity>
        );
    }, [styles.recentItemCard, styles.recentItemMeta, styles.recentItemTitle, styles.recentTextBlock]);

    const renderReflectionItem = useCallback(({ item }: { item: ReflectionCard }) => {
        const source = typeof item.image === 'string' ? { uri: item.image } : item.image;
        return (
            <View style={styles.reflectionCardWrap}>
                <View style={styles.reflectionCard}>
                    <TouchableOpacity activeOpacity={0.85} style={styles.reflectionActionButton}>
                        <View style={styles.reflectionActionDot} />
                        <TextComp isDynamic text={item.badge} style={styles.reflectionActionText} />
                    </TouchableOpacity>

                    <ImageComp
                        source={source}
                        width="100%"
                        height={moderateScale(260)}
                        borderRadius={0}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.reflectionImage}
                    />

                    <View style={styles.reflectionContent}>
                        <TextComp isDynamic text="CLARITY & VISION" style={styles.reflectionCategory} />
                        <TextComp isDynamic text={item.title} style={styles.reflectionTitle} />
                        <TextComp
                            isDynamic
                            text="The light within you is ready to shine. Trust your intuition in moments of uncertainty."
                            style={styles.reflectionDescription}
                        />
                    </View>
                </View>
            </View>
        );
    }, [
        styles.reflectionActionButton,
        styles.reflectionActionDot,
        styles.reflectionActionText,
        styles.reflectionCard,
        styles.reflectionCardWrap,
        styles.reflectionCategory,
        styles.reflectionContent,
        styles.reflectionDescription,
        styles.reflectionImage,
        styles.reflectionTitle,
    ]);

    const renderReflectionSeparator = useCallback(() => {
        return <View style={styles.reflectionListSeparator} />;
    }, [styles.reflectionListSeparator]);

    if (loading) {
        return (
            <WrapperContainer style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={commonColors.primary} />
            </WrapperContainer>
        );
    }

    return (
        <WrapperContainer style={styles.container} edges={['top']}>
            <HeaderComp
                showBack={false}
                variant="withCustomContent"
                containerStyle={styles.headerContainer}
                customContent={
                    <View style={styles.headerContentContainer}>
                        <View style={styles.headerTextContainer}>
                            <TextComp isDynamic text={getCurrentDate()} style={styles.headerDate} />
                            <TextComp isDynamic text="Greetings, Seeker" style={styles.headerGreeting} />
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                            <ImageComp
                                source={ProfileImage}
                                width={moderateScale(40)}
                                height={moderateScale(40)}
                                circular
                            />
                        </TouchableOpacity>
                    </View>
                }
            />
            <FlashList<RecentInsightCard>
                data={recentInsights}
                renderItem={renderRecentItem}
                keyExtractor={(item: RecentInsightCard) => item.id.toString()}
                estimatedItemSize={68}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[commonColors.primary]}
                        tintColor={commonColors.primary}
                    />
                }
                ListHeaderComponent={
                    <>


                        <View style={styles.topOptionRow}>
                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={() => navigation.navigate('ShuffleandDraw')}
                                style={[
                                    styles.optionCard,
                                    styles.optionCardActive,
                                ]}
                            >
                                <View style={styles.optionIconCircle}>
                                    <ShuffleIcon />
                                </View>
                                <TextComp
                                    isDynamic
                                    text="Shuffle & Draw"
                                    style={[
                                        styles.optionText,
                                        styles.optionTextActive,
                                    ]}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={() => navigation.navigate('Guidebook')}
                                style={[
                                    styles.optionCard,
                                    styles.optionCardInactive,
                                ]}
                            >
                                <View style={styles.optionIconCircle}>
                                    <GuidebookIcon />
                                </View>
                                <TextComp
                                    isDynamic
                                    text="Guidebook"
                                    style={[
                                        styles.optionText,
                                        styles.optionTextInactive,
                                    ]}
                                />
                            </TouchableOpacity>
                        </View>

                        <TextComp isDynamic text="Today's Reflection" style={styles.sectionTitle} />

                        <FlashList<ReflectionCard>
                            horizontal
                            data={reflectionCards}
                            renderItem={renderReflectionItem}
                            keyExtractor={item => String(item.id)}
                            estimatedItemSize={320}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.reflectionListContainer}
                            ItemSeparatorComponent={renderReflectionSeparator}
                            pagingEnabled
                            decelerationRate="fast"
                        />

                        <View style={styles.recentHeaderRow}>
                            <TextComp isDynamic text="Recent Insights" style={styles.recentHeaderTitle} />
                            <TouchableOpacity activeOpacity={0.8}>
                                <TextComp isDynamic text="View Journal" style={styles.viewJournalText} />
                            </TouchableOpacity>
                        </View>
                    </>
                }
                ListFooterComponent={<View style={styles.listFooterSpace} />}
            />
        </WrapperContainer>
    );
};

export default Home;
