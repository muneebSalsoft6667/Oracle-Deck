import React from 'react';
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    ViewStyle,
    View,
    TextStyle,
    TouchableOpacity,
    Platform,
} from 'react-native';
import fontFamily from '@/styles/fontFamily';
import { moderateScale } from '@/styles/scaling';
import { t } from 'i18next';
import useIsRTL from '@/hooks/useIsRTL';
import { useTheme } from '@/context/ThemeContext';
import { Colors, commonColors } from '@/styles/colors';
import { ThemeType } from '@/styles/colors';

interface TextInputCompProps extends TextInputProps {
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    error?: boolean;
    touched?: boolean;
    placeholder?: string;
    rightIcon?: React.ReactNode;
    onRightIconPress?: () => void;
    leftIcon?: React.ReactNode;
}

const TextInputComp: React.FC<TextInputCompProps> = ({
    containerStyle,
    inputStyle,
    error,
    touched,
    placeholder,
    rightIcon,
    onRightIconPress,
    leftIcon,
    ...props
}) => {
    const { theme } = useTheme();
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL, theme);
    const colors = Colors[theme];

    return (
        <View
            style={[
                styles.container,
                error && touched && styles.errorContainer,
                containerStyle,
            ]}
        >
            {leftIcon && (
                <View style={styles.leftIconContainer}>
                    {leftIcon}
                </View>
            )}
            <TextInput
                style={[
                    styles.input,
                    error && touched && styles.errorInput,
                    leftIcon && styles.inputWithLeftIcon,
                    rightIcon && styles.inputWithRightIcon,
                    inputStyle,
                ]}
                placeholderTextColor={colors.inputPlaceholder}
                placeholder={placeholder ? t(placeholder) : ''}
                textAlign={isRTL ? 'right' : 'left'}
                {...props}
            />
            {rightIcon && (
                <TouchableOpacity
                    onPress={onRightIconPress}
                    disabled={!onRightIconPress}
                    style={styles.rightIconContainer}
                    activeOpacity={0.7}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    {rightIcon}
                </TouchableOpacity>
            )}
        </View>
    );
};

const useRTLStyles = (isRTL: boolean, theme?: ThemeType) => {
    const colors = Colors[theme];

    return StyleSheet.create({
        container: {
            backgroundColor: '#FFFFFF',
            borderWidth: 2,
            borderColor: colors.inputBorder,
            borderRadius: moderateScale(20),
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            minHeight: moderateScale(48),
            paddingHorizontal: moderateScale(14),
        },
        input: {
            flex: 1,
            fontFamily: fontFamily.regular,
            fontSize: moderateScale(14),
            color: colors.text,
            paddingVertical: moderateScale(14),
            paddingHorizontal: 0,
            margin: 0,
            ...Platform.select({
                android: {
                    paddingVertical: moderateScale(12),
                },
            }),
        },
        inputWithLeftIcon: {
            paddingLeft: isRTL ? 0 : moderateScale(8),
            paddingRight: isRTL ? moderateScale(8) : 0,
        },
        inputWithRightIcon: {
            paddingRight: isRTL ? 0 : moderateScale(8),
            paddingLeft: isRTL ? moderateScale(8) : 0,
        },
        leftIconContainer: {
            marginRight: isRTL ? 0 : moderateScale(8),
            marginLeft: isRTL ? moderateScale(8) : 0,
            justifyContent: 'center',
            alignItems: 'center',
        },
        rightIconContainer: {
            marginLeft: isRTL ? 0 : moderateScale(8),
            marginRight: isRTL ? moderateScale(8) : 0,
            justifyContent: 'center',
            alignItems: 'center',
            padding: moderateScale(4),
        },
        errorContainer: {
            borderColor: commonColors.error,
            borderWidth: 1,
        },
        errorInput: {
            color: commonColors.error,
        },
    });
};

export default React.memo(TextInputComp);
