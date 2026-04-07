import React, { useState, useMemo } from 'react';
import { View, Pressable, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ButtonComp from '@/components/ButtonComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import ImageComp from '@/components/ImageComp';
import useIsRTL from '@/hooks/useIsRTL';
import { AuthStackParamList } from '@/navigation/types';
import { useTheme } from '@/context/ThemeContext';
import useRTLStyles from './styles';
import { ProfileImage } from '@/assets/images';
import { ProfileIcon } from '@/assets/icons';
import { launchImageLibrary } from 'react-native-image-picker';
import { changeFirstTimeState } from '@/redux/actions/auth';
import { secureStorage } from '@/utils/secureStorage';

const Personalize = () => {
    const isRTL = useIsRTL();
    const { theme } = useTheme();
    const styles = useRTLStyles(isRTL, theme);
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    const [spiritualName, setSpiritualName] = useState('');
    const [selectedFocus, setSelectedFocus] = useState<string>('Love');
    const [avatarUri, setAvatarUri] = useState<string | null>(null);

    const dailyFocusOptions = ['Love', 'Career', 'Growth', 'Peace'];

    const profileSource = useMemo(
        () => (avatarUri ? { uri: avatarUri } : ProfileImage),
        [avatarUri]
    );

    const handlePickAvatar = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.9,
            selectionLimit: 1,
        });

        if (result.didCancel) {
            return;
        }
        const selectedUri = result.assets?.[0]?.uri;
        if (selectedUri) {
            setAvatarUri(selectedUri);
        }
    };

    const handleEnterSanctuary = async () => {
        // Mark that personalization is complete
        await secureStorage.setItem('HAS_PERSONALIZED', 'true');
        
        // Change isFirstTime to true - this will trigger Routes to switch from Auth to Main
        // isFirstTime: true means user is logged in (show Main), false means not logged in (show Auth)
        changeFirstTimeState(true);
    };

    return (
        <WrapperContainer style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.content}>
                        {/* Back Button */}
                        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                            <View style={styles.backIconContainer}>
                                <View style={styles.backArrow} />
                            </View>
                        </Pressable>

                        {/* Title Section */}
                        <View style={styles.titleSection}>
                            <TextComp isDynamic text="Personalize" style={styles.title} />
                            <TextComp
                                isDynamic
                                text="How should the oracle address you?"
                                style={styles.subtitle}
                            />
                        </View>

                        {/* Avatar Section */}
                        <View style={styles.avatarSection}>
                            <Pressable onPress={handlePickAvatar} style={styles.avatarPressable}>
                                {avatarUri ? (
                                    <ImageComp
                                        source={profileSource}
                                        width={120}
                                        height={120}
                                        circular
                                        style={styles.avatar}
                                    />
                                ) : (
                                    <View style={styles.avatarPlaceholder}>
                                        <ProfileIcon width={60} height={60} />
                                    </View>
                                )}
                                <View style={styles.plusBadge}>
                                    <View style={styles.plusVertical} />
                                    <View style={styles.plusHorizontal} />
                                </View>
                            </Pressable>
                            <TextComp isDynamic text="CHOOSE AVATAR" style={styles.chooseAvatarText} />
                        </View>

                        {/* Spiritual Name Input */}
                        <View style={styles.inputSection}>
                            <TextComp isDynamic text="Spiritual Name" style={styles.inputLabel} />
                            <TextInput
                                value={spiritualName}
                                onChangeText={setSpiritualName}
                                placeholder="E.g. Selene"
                                placeholderTextColor="#A39E95"
                                style={styles.spiritualNameInput}
                            />
                        </View>

                        {/* Daily Focus Section */}
                        <View style={styles.focusSection}>
                            <TextComp isDynamic text="Daily Focus" style={styles.inputLabel} />
                            <View style={styles.focusGrid}>
                                {dailyFocusOptions.map((option) => (
                                    <Pressable
                                        key={option}
                                        style={[
                                            styles.focusButton,
                                            selectedFocus === option && styles.focusButtonSelected,
                                        ]}
                                        onPress={() => setSelectedFocus(option)}
                                    >
                                        <TextComp
                                            isDynamic
                                            text={option}
                                            style={[
                                                styles.focusButtonText,
                                                selectedFocus === option && styles.focusButtonTextSelected,
                                            ]}
                                        />
                                    </Pressable>
                                ))}
                            </View>
                        </View>

                        {/* Enter The Sanctuary Button */}
                        <View style={styles.buttonSection}>
                            <ButtonComp
                                title="ENTER THE SANCTUARY"
                                onPress={handleEnterSanctuary}
                              
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </WrapperContainer>
    );
};

export default Personalize;
