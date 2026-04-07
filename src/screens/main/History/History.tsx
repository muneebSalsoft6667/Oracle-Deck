import ImageComp from '@/components/ImageComp';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import { fall, fall02, fall03, fall04, fall05 } from '@/assets/images';
import { ArrowRightIcon } from '@/assets/icons';
import useIsRTL from '@/hooks/useIsRTL';
import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, SectionList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '@/navigation/types';
import useRTLStyles from './styles';

interface HistoryItem {
    id: string;
    title: string;
    cardCount: number;
    date: string;
    images: number[];
}

interface HistorySection {
    title: string;
    data: HistoryItem[];
}

const History = () => {
    const isRTL = useIsRTL();
    const [query, setQuery] = useState('');
    const styles = useRTLStyles(isRTL);
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

    const historyItems = useMemo<HistoryItem[]>(() => [
        {
            id: 'journal-1',
            date: 'FEB 04, 2026',
            title: 'Daily Reflection',
            cardCount: 1,
            images: [fall],
        },
        {
            id: 'journal-2',
            date: 'JAN 31, 2026',
            title: 'Temporal Path',
            cardCount: 3,
            images: [fall04, fall02, fall03],
        },
        {
            id: 'journal-3',
            date: 'JAN 25, 2026',
            title: 'Sacred Growth',
            cardCount: 2,
            images: [fall05, fall02],
        },
    ], []);

    const filteredItems = useMemo(() => {
        const normalizedQuery = query.toLowerCase().trim();
        if (!normalizedQuery) {
            return historyItems;
        }

        return historyItems.filter(item => {
            const byTitle = item.title.toLowerCase().includes(normalizedQuery);
            const byDate = item.date.toLowerCase().includes(normalizedQuery);
            const byCount = `${item.cardCount} cards`.toLowerCase().includes(normalizedQuery);
            return byTitle || byDate || byCount;
        });
    }, [historyItems, query]);

    const sections = useMemo<HistorySection[]>(() => {
        const grouped = filteredItems.reduce<Record<string, HistoryItem[]>>((acc, item) => {
            if (!acc[item.date]) {
                acc[item.date] = [];
            }
            acc[item.date].push(item);
            return acc;
        }, {});

        return Object.keys(grouped).map(date => ({
            title: date,
            data: grouped[date],
        }));
    }, [filteredItems]);

    const renderImageStack = (images: number[]) => {
        const maxImages = images.slice(0, 3);
        return (
            <View style={styles.imageStackContainer}>
                {maxImages.map((image, index) => (
                    <View
                        key={`${String(image)}-${index}`}
                        style={[styles.imageStackItem, { left: index * 14, zIndex: maxImages.length - index }]}
                    >
                        <ImageComp source={image} width={55} height={74} borderRadius={12} />
                    </View>
                ))}
            </View>
        );
    };

    const renderItem = ({ item }: { item: HistoryItem }) => {
        const handlePress = () => {
            // Only navigate for Daily Reflection and Temporal Path
            if (item.title === 'Daily Reflection' || item.title === 'Temporal Path') {
                navigation.navigate('JournalHistoryDetails', { journalId: item.id });
            }
        };

        return (
            <Pressable 
                style={styles.itemCard} 
                android_ripple={{ color: '#f3f0eb' }}
                onPress={handlePress}
            >
                <View style={styles.itemLeftContent}>
                    {renderImageStack(item.images)}
                    <View style={styles.itemTextContent}>
                        <TextComp isDynamic text={item.title} style={styles.itemTitle} />
                        <TextComp isDynamic text={`${item.cardCount} Cards`} style={styles.itemSubtitle} />
                    </View>
                </View>
                <View style={styles.arrowContainer}>
                    <ArrowRightIcon width={24} height={24} />
                </View>
            </Pressable>
        );
    };

    const renderSectionHeader = ({ section }: { section: HistorySection }) => (
        <TextComp isDynamic text={section.title} style={styles.dateHeader} />
    );

    const renderSectionSeparator = useCallback(
        () => <View style={styles.sectionSpacing} />,
        [styles.sectionSpacing],
    );

    const listEmptyComponent = useMemo(
        () => (
            <View style={styles.emptyContainer}>
                <TextComp isDynamic text="No journal entries found" style={styles.emptyText} />
            </View>
        ),
        [styles.emptyContainer, styles.emptyText],
    );

    return (
        <WrapperContainer style={styles.container}>
            <HeaderComp
                showBack
                title="Journal"
                searchPlaceholder="Search Journal"
                rightAction="search"
                searchValue={query}
                onSearchChange={setQuery}
            />
            <SectionList
                sections={sections}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                contentContainerStyle={styles.listContent}
                stickySectionHeadersEnabled={false}
                showsVerticalScrollIndicator={false}
                SectionSeparatorComponent={renderSectionSeparator}
                ListEmptyComponent={listEmptyComponent}
            />
        </WrapperContainer>
    );
};
export default History;                 