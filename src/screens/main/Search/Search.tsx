import ImageComp from '@/components/ImageComp';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import useIsRTL from '@/hooks/useIsRTL';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { fall, fall02, fall03, fall04, fall05 } from '@/assets/images';
import useRTLStyles from './styles';

type Category = 'Elemental' | 'Celestial' | 'Self' | 'Growth' | 'Rituals';

interface SuggestedCard {
    id: string;
    title: string;
    category: Category;
    image: number;
}

const Search = () => {
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL);
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category>('Rituals');

    const categories = useMemo<Category[]>(
        () => ['Elemental', 'Celestial', 'Self', 'Growth', 'Rituals'],
        [],
    );

    const cards = useMemo<SuggestedCard[]>(
        () => [
            { id: '1', title: 'Card 1', category: 'Rituals', image: fall },
            { id: '2', title: 'Card 2', category: 'Rituals', image: fall02 },
            { id: '3', title: 'Card 3', category: 'Rituals', image: fall03 },
            { id: '4', title: 'Card 4', category: 'Elemental', image: fall04 },
            { id: '5', title: 'Card 5', category: 'Growth', image: fall05 },
            { id: '6', title: 'Card 6', category: 'Self', image: fall02 },
            { id: '7', title: 'Card 7', category: 'Celestial', image: fall03 },
        ],
        [],
    );

    const filteredCards = useMemo(() => {
        const byCategory = cards.filter(card => card.category === selectedCategory);
        if (!query.trim()) {
            return byCategory;
        }

        const normalizedQuery = query.toLowerCase().trim();
        return byCategory.filter(card => card.title.toLowerCase().includes(normalizedQuery));
    }, [cards, query, selectedCategory]);

    const renderSuggestedCard = ({ item }: { item: SuggestedCard }) => {
        return (
            <View style={styles.suggestedCard}>
                <ImageComp
                    source={item.image}
                    width="100%"
                    height={110}
                    borderRadius={0}
                    style={styles.suggestedImage}
                />
                <View style={styles.suggestedCardBody}>
                    <TextComp isDynamic text="THE MESSENGER" style={styles.suggestedLabel} />
                    <TextComp isDynamic text={item.title} style={styles.suggestedTitle} />
                </View>
            </View>
        );
    };

    const renderSuggestedSeparator = useCallback(
        () => <View style={styles.suggestedSeparator} />,
        [styles.suggestedSeparator],
    );

    return (
        <WrapperContainer style={styles.container}>
            <HeaderComp
                showBack={true}
                title="Search"
                rightAction="search"
                searchPlaceholder="Search Keywords or Cards...."
                searchValue={query}
                onSearchChange={setQuery}
            />
            <View style={styles.content}>
                <TextComp isDynamic text="Categories" style={styles.sectionTitle} />

                <View style={styles.categoriesContainer}>
                    {categories.map(category => {
                        const isActive = selectedCategory === category;
                        return (
                            <TouchableOpacity
                                key={category}
                                activeOpacity={0.85}
                                onPress={() => setSelectedCategory(category)}
                                style={[
                                    styles.categoryChip,
                                    isActive && styles.categoryChipActive,
                                ]}
                            >
                                <TextComp
                                    isDynamic
                                    text={category}
                                    style={[
                                        styles.categoryText,
                                        isActive && styles.categoryTextActive,
                                    ]}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <TextComp isDynamic text="Suggested Today!" style={styles.sectionTitle} />

                <FlashList<SuggestedCard>
                    horizontal
                    data={filteredCards}
                    renderItem={renderSuggestedCard}
                    keyExtractor={item => item.id}
                    estimatedItemSize={170}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.suggestedList}
                    ItemSeparatorComponent={renderSuggestedSeparator}
                    ListEmptyComponent={
                        <TextComp
                            isDynamic
                            text="No cards found"
                            style={styles.emptyText}
                        />
                    }
                />
            </View>
        </WrapperContainer>
    );
};
export default Search;