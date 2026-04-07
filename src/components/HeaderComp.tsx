import React, { useState, ReactNode } from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable, ViewStyle, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackArrowIcon, SettingsIcon, SearchIcon } from '@/assets/icons';
import TextComp from '@/components/TextComp';
import ModalComp from './ModalComp';
import LogoutModal from './LogoutModal';
import ButtonComp from './ButtonComp';
import { useTheme } from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import { changeLanguageState } from '@/redux/actions/settings';
import { clearDataAction } from '@/redux/actions/auth';
import { useSelector } from '@/redux/hooks';
import { LanguageInterface } from '@/redux/reducers/settings';
import { Colors, ThemeType, commonColors } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { moderateScale } from '@/styles/scaling';
import { secureStorage } from '@/utils/secureStorage';

export type HeaderVariant = 'default' | 'withSearchInput' | 'withCustomContent';

interface HeaderCompProps {
    /** Title text to display next to the back button */
    title?: string;
    /** Whether to show the back button */
    showBack?: boolean;
    /** Custom style for the header container */
    containerStyle?: ViewStyle;
    /** @deprecated Use containerStyle instead. Custom style for the header container */
    customStyle?: ViewStyle;
    /** Variant of header: 'default', 'withSearchInput', or 'withCustomContent' */
    variant?: HeaderVariant;
    /** Custom content to display in the middle (for variant='withCustomContent') */
    customContent?: ReactNode;
    /** Use column/stretch layout for custom content so large header bodies can be rendered inside HeaderComp */
    fullWidthCustomContent?: boolean;
    /** Search input placeholder text (for variant='withSearchInput') */
    searchPlaceholder?: string;
    /** Search input value (for variant='withSearchInput') */
    searchValue?: string;
    /** Search input onChange callback (for variant='withSearchInput') */
    onSearchChange?: (text: string) => void;
    /** Called when user submits search from keyboard */
    onSearchSubmit?: (text: string) => void;
    /** Called when search open/close state changes */
    onSearchToggle?: (isOpen: boolean) => void;
    /** Auto-focus search input when expanded */
    autoFocusSearchInput?: boolean;
    /** Right action: 'settings', 'search', 'custom', or 'none' */
    rightAction?: 'settings' | 'search' | 'custom' | 'none';
    /** Custom right action component (used when rightAction is 'custom') */
    rightActionComponent?: ReactNode;
    /** Callback for custom right action press */
    onRightActionPress?: () => void;
    /** Callback for back button press (defaults to navigation.goBack()) */
    onBackPress?: () => void;
}

const HeaderComp: React.FC<HeaderCompProps> = ({
    title,
    showBack = true,
    containerStyle,
    customStyle, // For backward compatibility
    variant = 'default',
    customContent,
    fullWidthCustomContent = false,
    searchPlaceholder = 'Search Keywords or Cards....',
    searchValue,
    onSearchChange,
    onSearchSubmit,
    onSearchToggle,
    autoFocusSearchInput = true,
    rightAction = 'none',
    rightActionComponent,
    onRightActionPress,
    onBackPress,
}) => {
    const navigation = useNavigation();
    const { theme, toggleTheme } = useTheme();
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL, theme);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [internalSearchValue, setInternalSearchValue] = useState('');

    const colors = Colors[theme];
    const { defaultTheme } = useSelector(state => state.settings);
    const { isFirstTime } = useSelector(state => state.auth);
    const resolvedSearchValue = searchValue ?? internalSearchValue;

    const handleSearchChange = (text: string) => {
        if (searchValue === undefined) {
            setInternalSearchValue(text);
        }
        onSearchChange?.(text);
    };

    const openSearch = () => {
        setIsSearchOpen(true);
        onSearchToggle?.(true);
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
        if (searchValue === undefined) {
            setInternalSearchValue('');
        }
        onSearchChange?.('');
        onSearchToggle?.(false);
    };

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            navigation.goBack();
        }
    };

    const handleRightActionPress = () => {
        if (rightAction === 'search') {
            openSearch();
            onRightActionPress?.();
            return;
        }

        if (onRightActionPress) {
            onRightActionPress();
        } else if (rightAction === 'settings') {
            setIsModalVisible(true);
        }
    };

    const changedTheme = async () => {
        const newTheme = defaultTheme.myTheme === 'light' ? 'dark' : 'light';
        await secureStorage.setItem('THEME', newTheme);
        toggleTheme();
        closeModal();
    };

    const changedLanguage = (language: LanguageInterface) => {
        changeLanguageState(language);
        closeModal();
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handleLogoutClick = () => {
        closeModal();
        setTimeout(() => {
            setIsLogoutModalVisible(true);
        }, 300);
    };

    const handleLogoutConfirm = () => {
        setIsLogoutModalVisible(false);
        setTimeout(() => {
            clearDataAction();
        }, 200);
    };

    const handleLogoutCancel = () => {
        setIsLogoutModalVisible(false);
    };

    const renderRightAction = () => {
        if (rightAction === 'search' && isSearchOpen) {
            return null;
        }

        if (rightAction === 'none') {
            return null;
        }

        if (rightAction === 'custom' && rightActionComponent) {
            return (
                <Pressable onPress={handleRightActionPress} style={styles.rightActionContainer}>
                    {rightActionComponent}
                </Pressable>
            );
        }

        if (rightAction === 'search') {
            return (
                <Pressable onPress={handleRightActionPress} style={styles.rightActionContainer}>
                    <SearchIcon  width={20} height={20} />
                </Pressable>
            );
        }

        // Default: settings
        return (
            <Pressable onPress={handleRightActionPress} style={styles.rightActionContainer}>
                <SettingsIcon width={20} height={20} />
            </Pressable>
        );
    };

    const renderContent = () => {
        if (variant === 'withSearchInput' || (rightAction === 'search' && isSearchOpen)) {
            return (
                <View style={styles.searchInputContainer}>
                    <SearchIcon width={20} height={20} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder={searchPlaceholder}
                        placeholderTextColor={colors.textSecondary}
                        value={resolvedSearchValue}
                        onChangeText={handleSearchChange}
                        textAlign={isRTL ? 'right' : 'left'}
                        autoFocus={autoFocusSearchInput}
                        returnKeyType="search"
                        onSubmitEditing={() => onSearchSubmit?.(resolvedSearchValue)}
                    />
                    <Pressable onPress={closeSearch} hitSlop={10}>
                        <TextComp isDynamic text="x" style={styles.searchCloseText} />
                    </Pressable>
                </View>
            );
        }

        if (variant === 'withCustomContent') {
            return (
                <View
                    style={[
                        styles.customContentContainer,
                        fullWidthCustomContent && styles.customContentContainerFullWidth,
                    ]}
                >
                    {customContent}
                </View>
            );
        }

        // Default: title next to back button
        if (title) {
            return (
                <View style={styles.titleContainer}>
                    <TextComp text={title} style={styles.titleText} />
                </View>
            );
        }

        return null;
    };

    return (
        <>
            <View style={[styles.container, containerStyle || customStyle]}>
                {/* Left: Back Button */}
                {showBack && (
                    <TouchableOpacity
                        onPress={handleBackPress}
                        style={styles.backButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        activeOpacity={0.7}
                    >
                        <BackArrowIcon width={20} height={20} />
                    </TouchableOpacity>
                )}

                {/* Middle: Title, Search Input, or Custom Content */}
                {renderContent()}

                {/* Right: Action Button */}
                {renderRightAction()}
            </View>

            {/* Settings Modal */}
            {rightAction === 'settings' && (
                <ModalComp isVisible={isModalVisible} onClose={closeModal}>
                    <View style={styles.modalContainer}>
                        <TextComp text="SETTINGS" style={styles.modalTitle} />

                        {/* Language Section */}
                        <View style={styles.section}>
                            <TextComp text="LANGUAGE" style={styles.sectionTitle} />
                            <View style={styles.optionRow}>
                                <TouchableOpacity
                                    style={[styles.optionButton, isRTL && styles.optionButtonActive]}
                                    onPress={() => changedLanguage({ name: 'Arabic', sortName: 'ar' })}
                                    activeOpacity={0.7}
                                >
                                    <TextComp
                                        text="Arabic"
                                        isDynamic
                                        style={[styles.optionText, isRTL && styles.optionTextActive]}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.optionButton, !isRTL && styles.optionButtonActive]}
                                    onPress={() => changedLanguage({ name: 'English', sortName: 'en' })}
                                    activeOpacity={0.7}
                                >
                                    <TextComp
                                        text="English"
                                        isDynamic
                                        style={[styles.optionText, !isRTL && styles.optionTextActive]}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Theme Section */}
                        <View style={styles.section}>
                            <TextComp text="THEME" style={styles.sectionTitle} isDynamic={false} />
                            <View style={styles.optionRow}>
                                <TouchableOpacity
                                    style={[styles.optionButton, theme === 'light' && styles.optionButtonActive]}
                                    onPress={changedTheme}
                                    activeOpacity={0.7}
                                >
                                    <TextComp
                                        text="LIGHT"
                                        style={[styles.optionText, theme === 'light' && styles.optionTextActive]}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.optionButton, theme === 'dark' && styles.optionButtonActive]}
                                    onPress={changedTheme}
                                    activeOpacity={0.7}
                                >
                                    <TextComp
                                        text="DARK"
                                        style={[styles.optionText, theme === 'dark' && styles.optionTextActive]}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Logout Button */}
                        {isFirstTime && <ButtonComp title="LOGOUT" onPress={handleLogoutClick} />}
                    </View>
                </ModalComp>
            )}

            {/* Logout Confirmation Modal */}
            <LogoutModal
                isVisible={isLogoutModalVisible}
                onClose={handleLogoutCancel}
                onConfirm={handleLogoutConfirm}
            />
        </>
    );
};

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
    const colors = Colors[theme];

    return StyleSheet.create({
        container: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: moderateScale(16),
            paddingVertical: moderateScale(12),
            minHeight: moderateScale(56),
            backgroundColor:'#FFFFFF',
           
            borderBottomWidth: 0.3,
            borderBottomColor: commonColors.gray300,
        },
        backButton: {
            backgroundColor: commonColors.white,
            padding: moderateScale(5),
            borderRadius: moderateScale(20),
            shadowColor: commonColors.gray500,
            shadowOffset: {
                width: 2,
                height: 2,
            },
            shadowOpacity: 0.45,
            shadowRadius: 4.84,
            elevation: 10,
            justifyContent: 'center',
            alignItems: 'center',
            width: moderateScale(40),
            height: moderateScale(40),
            marginRight: isRTL ? 0 : moderateScale(12),
            marginLeft: isRTL ? moderateScale(12) : 0,
        },
        titleContainer: {
            flex: 1,
            justifyContent: 'center',
        },
        titleText: {
            fontSize: moderateScale(18),
            fontFamily: fontFamily.times,
            color:commonColors.black,
            textAlign: isRTL ? 'right' : 'left',
            fontWeight: 'bold',
        },
        searchInputContainer: {
            flex: 1,
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            backgroundColor: commonColors.white,
            borderWidth: 1,
            borderColor: colors.inputBorder,
            borderRadius: moderateScale(20),
            paddingHorizontal: moderateScale(12),
            paddingVertical: moderateScale(10),
            marginRight: isRTL ? 0 : moderateScale(12),
            marginLeft: isRTL ? moderateScale(12) : 0,
            gap: moderateScale(8),
        },
        searchInput: {
            flex: 1,
            fontSize: moderateScale(14),
            fontFamily: fontFamily.regular,
            color: colors.text,
            padding: 0,
        },
        searchCloseText: {
            fontSize: moderateScale(16),
            fontFamily: fontFamily.medium,
            color: colors.textSecondary,
            marginLeft: moderateScale(6),
            marginRight: moderateScale(2),
        },
        customContentContainer: {
            flex: 1,
            flexDirection:  'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginRight: isRTL ? 0 : moderateScale(12),
            marginLeft: isRTL ? moderateScale(12) : 0,
        },
        customContentContainerFullWidth: {
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            marginRight: 0,
            marginLeft: 0,
        },
        rightActionContainer: {
            width: moderateScale(40),
            height: moderateScale(40),
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContainer: {
            backgroundColor: colors.background,
            minHeight: moderateScale(100),
        },
        modalTitle: {
            fontSize: moderateScale(24),
            fontFamily: fontFamily.bold,
            marginBottom: moderateScale(24),
            textAlign: 'center',
        },
        section: {
            marginBottom: moderateScale(24),
        },
        sectionTitle: {
            fontSize: moderateScale(16),
            fontFamily: fontFamily.medium,
            marginBottom: moderateScale(12),
            opacity: 0.8,
        },
        optionRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: moderateScale(12),
        },
        optionButton: {
            flex: 1,
            padding: moderateScale(12),
            borderRadius: moderateScale(12),
            backgroundColor: colors.surface,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.inputBorder,
        },
        optionButtonActive: {
            backgroundColor: colors.text,
            borderColor: colors.text,
        },
        optionText: {
            fontSize: moderateScale(16),
            fontFamily: fontFamily.medium,
            color: colors.text,
        },
        optionTextActive: {
            color: colors.background,
        },
    });
};

export default HeaderComp;
