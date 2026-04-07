import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard,TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ButtonComp from '@/components/ButtonComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import useIsRTL from '@/hooks/useIsRTL';
import { AuthStackParamList } from '@/navigation/types';
import { useTheme } from '@/context/ThemeContext';
import useRTLStyles from './styles';
import { OtpInput } from 'react-native-otp-entry';

interface ForgotOTPRouteParams {
    email: string;
}

const ForgotOTP = () => {
    const isRTL = useIsRTL();
    const { theme } = useTheme();
    const styles = useRTLStyles(isRTL, theme);
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const route = useRoute();
    const { email } = (route.params as ForgotOTPRouteParams) || { email: '' };

    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const handleVerifyOTP = () => {
        if (otp.length !== 6) {
            setError('Please enter the complete 6-digit code');
            return;
        }

        // TODO: Implement actual OTP verification logic
        // Navigate to Reset Password screen
        navigation.navigate('ResetPassword', { email, otp });
    };

    const handleResendOTP = () => {
        // TODO: Implement resend OTP logic
        setOtp('');
        setError('');
        // Show success message or toast
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
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.content}>
                            <View style={styles.titleSection}>
                                <TextComp isDynamic text="Verify OTP" style={styles.title} />
                                <TextComp
                                    isDynamic
                                    text={`We've sent a verification code to ${email}`}
                                    style={styles.subtitle}
                                />
                            </View>

                            <View style={styles.otpSection}>
                                <OtpInput
                                    numberOfDigits={6}
                                    onTextChange={(text) => {
                                        setOtp(text);
                                        setError('');
                                    }}
                                    autoFocus={true}
                                    theme={{
                                        containerStyle: styles.otpContainer,
                                        pinCodeContainerStyle: styles.otpField,
                                        pinCodeTextStyle: styles.otpText,
                                    }}
                                />
                                {error && (
                                    <TextComp isDynamic text={error} style={styles.errorText} />
                                )}
                            </View>

                            <View style={styles.buttonSection}>
                                <TouchableOpacity onPress={handleResendOTP}>
                                    <TextComp isDynamic text="Resend OTP" style={styles.resendText} />
                                </TouchableOpacity>
                                <ButtonComp
                                    title="VERIFY"
                                    onPress={handleVerifyOTP}
                                    style={styles.verifyButton}
                                    textStyle={styles.verifyButtonText}
                                    disabled={otp.length !== 6}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        </WrapperContainer>
    );
};

export default ForgotOTP;
