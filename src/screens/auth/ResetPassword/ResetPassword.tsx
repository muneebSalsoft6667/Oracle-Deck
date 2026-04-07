import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ButtonComp from '@/components/ButtonComp';
import TextComp from '@/components/TextComp';
import TextInputComp from '@/components/TextInputComp';
import WrapperContainer from '@/components/WrapperContainer';
import useIsRTL from '@/hooks/useIsRTL';
import { AuthStackParamList } from '@/navigation/types';
import { useTheme } from '@/context/ThemeContext';
import useRTLStyles from './styles';
import { EyeIcon } from '@/assets/icons';

interface ResetPasswordRouteParams {
    email: string;
    otp: string;
}

const ResetPassword = () => {
    const isRTL = useIsRTL();
    const { theme } = useTheme();
    const styles = useRTLStyles(isRTL, theme);
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const route = useRoute();
    const { email } = (route.params as ResetPasswordRouteParams) || { email: '', otp: '' };

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
    const [touched, setTouched] = useState<{ password?: boolean; confirmPassword?: boolean }>({});

    const validateForm = (): boolean => {
        const newErrors: { password?: string; confirmPassword?: string } = {};

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleResetPassword = () => {
        if (!validateForm()) {
            setTouched({ password: true, confirmPassword: true });
            return;
        }

        // TODO: Implement actual password reset API call
        // After successful reset, navigate to Login
        navigation.navigate('Login');
    };

    const handleBlur = (field: 'password' | 'confirmPassword') => {
        setTouched(prev => ({ ...prev, [field]: true }));
        
        if (field === 'password' && password) {
            if (password.length < 6) {
                setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
            } else {
                setErrors(prev => ({ ...prev, password: undefined }));
            }
        }
        
        if (field === 'confirmPassword' && confirmPassword) {
            if (password !== confirmPassword) {
                setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
            } else {
                setErrors(prev => ({ ...prev, confirmPassword: undefined }));
            }
        }
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
                        <View style={styles.titleSection}>
                            <TextComp isDynamic text="Reset Password" style={styles.title} />
                            <TextComp
                                isDynamic
                                text="Enter your new password below."
                                style={styles.subtitle}
                            />
                        </View>

                        <View style={styles.formSection}>
                            <View style={styles.inputGroup}>
                                <TextComp isDynamic text="New Password" style={styles.inputLabel} />
                                <TextInputComp
                                    value={password}
                                    onChangeText={(text) => {
                                        setPassword(text);
                                        if (touched.password) {
                                            if (!text.trim()) {
                                                setErrors(prev => ({ ...prev, password: 'Password is required' }));
                                            } else if (text.length < 6) {
                                                setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
                                            } else {
                                                setErrors(prev => ({ ...prev, password: undefined }));
                                            }
                                        }
                                        // Clear confirm password error if passwords now match
                                        if (touched.confirmPassword && confirmPassword && text === confirmPassword) {
                                            setErrors(prev => ({ ...prev, confirmPassword: undefined }));
                                        }
                                    }}
                                    onBlur={() => handleBlur('password')}
                                    placeholder=""
                                    secureTextEntry={!showPassword}
                                    rightIcon={<EyeIcon width={20} height={20} />}
                                    onRightIconPress={() => setShowPassword(!showPassword)}
                                    error={!!errors.password}
                                    touched={touched.password}
                                />
                                {errors.password && touched.password && (
                                    <TextComp isDynamic text={errors.password} style={styles.errorText} />
                                )}
                            </View>

                            <View style={styles.inputGroup}>
                                <TextComp isDynamic text="Confirm Password" style={styles.inputLabel} />
                                <TextInputComp
                                    value={confirmPassword}
                                    onChangeText={(text) => {
                                        setConfirmPassword(text);
                                        if (touched.confirmPassword) {
                                            if (!text.trim()) {
                                                setErrors(prev => ({ ...prev, confirmPassword: 'Please confirm your password' }));
                                            } else if (password !== text) {
                                                setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
                                            } else {
                                                setErrors(prev => ({ ...prev, confirmPassword: undefined }));
                                            }
                                        }
                                    }}
                                    onBlur={() => handleBlur('confirmPassword')}
                                    placeholder=""
                                    secureTextEntry={!showConfirmPassword}
                                    rightIcon={<EyeIcon width={20} height={20} />}
                                    onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                    error={!!errors.confirmPassword}
                                    touched={touched.confirmPassword}
                                />
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <TextComp isDynamic text={errors.confirmPassword} style={styles.errorText} />
                                )}
                            </View>
                        </View>

                        <View style={styles.buttonSection}>
                            <ButtonComp
                                title="RESET PASSWORD"
                                onPress={handleResetPassword}
                                style={styles.resetButton}
                                textStyle={styles.resetButtonText}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </WrapperContainer>
    );
};

export default ResetPassword;
