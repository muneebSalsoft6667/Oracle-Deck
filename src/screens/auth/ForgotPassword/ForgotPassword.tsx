import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ButtonComp from '@/components/ButtonComp';
import TextComp from '@/components/TextComp';
import TextInputComp from '@/components/TextInputComp';
import WrapperContainer from '@/components/WrapperContainer';
import useIsRTL from '@/hooks/useIsRTL';
import { AuthStackParamList } from '@/navigation/types';
import { useTheme } from '@/context/ThemeContext';
import useRTLStyles from './styles';

const ForgotPassword = () => {
    const isRTL = useIsRTL();
    const { theme } = useTheme();
    const styles = useRTLStyles(isRTL, theme);
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<{ email?: string }>({});
    const [touched, setTouched] = useState<{ email?: boolean }>({});

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = (): boolean => {
        const newErrors: { email?: string } = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSendOTP = () => {
        if (!validateForm()) {
            setTouched({ email: true });
            return;
        }

        // TODO: Implement actual API call to send OTP
        // Navigate to OTP verification screen
        navigation.navigate('ForgotOTP', { email });
    };

    const handleBlur = () => {
        setTouched(prev => ({ ...prev, email: true }));
        if (email) {
            if (!validateEmail(email)) {
                setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
            } else {
                setErrors(prev => ({ ...prev, email: undefined }));
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
                            <TextComp isDynamic text="Forgot Password" style={styles.title} />
                            <TextComp
                                isDynamic
                                text="Enter your email address and we'll send you a code to reset your password."
                                style={styles.subtitle}
                            />
                        </View>

                        <View style={styles.formSection}>
                            <View style={styles.inputGroup}>
                                <TextComp isDynamic text="Email Address" style={styles.inputLabel} />
                                <TextInputComp
                                    value={email}
                                    onChangeText={(text) => {
                                        setEmail(text);
                                        if (touched.email) {
                                            if (!text.trim()) {
                                                setErrors(prev => ({ ...prev, email: 'Email is required' }));
                                            } else if (!validateEmail(text)) {
                                                setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
                                            } else {
                                                setErrors(prev => ({ ...prev, email: undefined }));
                                            }
                                        }
                                    }}
                                    onBlur={handleBlur}
                                    placeholder=""
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    error={!!errors.email}
                                    touched={touched.email}
                                />
                                {errors.email && touched.email && (
                                    <TextComp isDynamic text={errors.email} style={styles.errorText} />
                                )}
                            </View>
                        </View>

                        <View style={styles.buttonSection}>
                            <ButtonComp
                                title="SEND OTP"
                                onPress={handleSendOTP}
                                style={styles.sendButton}
                                textStyle={styles.sendButtonText}
                            />
                        </View>

                        <View style={styles.backToLoginContainer}>
                            <TextComp isDynamic text="Remember your password? " style={styles.backToLoginText} />
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <TextComp isDynamic text="Sign In" style={styles.backToLoginLink} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </WrapperContainer>
    );
};

export default ForgotPassword;
