import React, { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import useIsRTL from '@/hooks/useIsRTL';
import useRTLStyles from './styles';
import { CheckmarkIcon } from '@/assets/icons';
import ButtonComp from '@/components/ButtonComp';

const Subscription = () => {
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL);
    const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual' | null>(null);

    const handlePlanSelect = (plan: 'monthly' | 'annual') => {
        setSelectedPlan(plan);
    };

    const handleSubscribe = () => {
        if (selectedPlan) {
            // Handle subscription logic here
            console.log(`Subscribing to ${selectedPlan} plan`);
        }
    };

    const premiumFeatures = [
        'Unlimited Daily Cards Draws',
        'Full 78-Card Oracle Deck',
        'Complete Guidebook Access',
        'Save Unlimited Readings',
    ];

    return (
        <WrapperContainer style={styles.container}>
            <HeaderComp showBack={true} title="SUBSCRIPTION STATUS" />
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Seeker Monthly Plan */}
                <Pressable
                    style={[
                        styles.planCard,
                        styles.monthlyCard,
                        selectedPlan === 'monthly' && styles.monthlyCardSelected,
                    ]}
                    onPress={() => handlePlanSelect('monthly')}
                    android_ripple={{ color: 'rgba(255,255,255,0.1)', borderless: false }}
                >
                    <TextComp isDynamic text="Seeker Monthly" style={styles.monthlyTitle} />
                    <View style={styles.priceRow}>
                        <TextComp isDynamic text="$7.99" style={styles.monthlyPrice} />
                        <TextComp isDynamic text="per month" style={styles.monthlyPeriod} />
                    </View>
                </Pressable>

                {/* Oracle Annual Plan */}
                <View style={styles.annualCardContainer}>
                    <View style={styles.recommendedBadge}>
                        <TextComp isDynamic text="RECOMMENDED" style={styles.recommendedText} />
                    </View>
                    <Pressable
                        style={[
                            styles.planCard,
                            styles.annualCard,
                            selectedPlan === 'annual' && styles.annualCardSelected,
                        ]}
                        onPress={() => handlePlanSelect('annual')}
                        android_ripple={{ color: 'rgba(0,0,0,0.05)', borderless: false }}
                    >
                        <View style={styles.annualHeader}>
                            <TextComp
                                isDynamic
                                text="Oracle Annual"
                                style={[
                                    styles.annualTitle,
                                    selectedPlan === 'annual' && styles.annualTitleSelected,
                                ]}
                            />
                            <TextComp
                                isDynamic
                                text="Save 45%"
                                style={[styles.saveText, selectedPlan === 'annual' && styles.saveTextSelected]}
                            />
                        </View>
                        <View style={styles.priceRow}>
                            <TextComp
                                isDynamic
                                text="$49.99"
                                style={[styles.annualPrice, selectedPlan === 'annual' && styles.annualPriceSelected]}
                            />
                            <TextComp
                                isDynamic
                                text="per year"
                                style={[styles.annualPeriod, selectedPlan === 'annual' && styles.annualPeriodSelected]}
                            />
                        </View>
                    </Pressable>
                </View>

                {/* Premium Features Section */}
                <View style={styles.featuresSection}>
                    <TextComp isDynamic text="Premium Features" style={styles.featuresTitle} />
                    {premiumFeatures.map((feature, index) => (
                        <View key={index} style={styles.featureCard}>
                            <CheckmarkIcon width={20} height={20} />
                            <TextComp isDynamic text={feature} style={styles.featureText} />
                        </View>
                    ))}
                </View>

                {/* Subscribe Button */}
                {selectedPlan && (
                    <View style={styles.buttonContainer}>
                        <ButtonComp
                            title="SUBSCRIBE NOW"
                            onPress={handleSubscribe}
                            height={52}
                            width="100%"
                            style={styles.subscribeButton}
                        />
                    </View>
                )}
            </ScrollView>
        </WrapperContainer>
    );
};

export default Subscription;
