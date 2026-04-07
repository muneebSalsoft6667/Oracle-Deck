import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ButtonComp from '@/components/ButtonComp';
import TextComp from '@/components/TextComp';
import TextInputComp from '@/components/TextInputComp';
import WrapperContainer from '@/components/WrapperContainer';
import { AuthStackParamList } from '@/navigation/types';
import useIsRTL from '@/hooks/useIsRTL';
import { useTheme } from '@/context/ThemeContext';
import useRTLStyles from './styles';
import { EyeIcon } from '@/assets/icons';

const Signup = () => {
    const isRTL = useIsRTL();
    const { theme } = useTheme();
    const styles = useRTLStyles(isRTL, theme);

    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = (): boolean => {
        const newErrors: { email?: string; password?: string } = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateAccount = () => {
        if (!validateForm()) {
            setTouched({ email: true, password: true });
            return;
        }

        // TODO: Implement actual signup logic
        // After successful signup, navigate back to Login
        navigation.navigate('Login');
    };

    const handleBlur = (field: 'email' | 'password') => {
        setTouched(prev => ({ ...prev, [field]: true }));
        if (field === 'email' && email) {
            if (!validateEmail(email)) {
                setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
            } else {
                setErrors(prev => ({ ...prev, email: undefined }));
            }
        }
        if (field === 'password' && password) {
            if (password.length < 6) {
                setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
            } else {
                setErrors(prev => ({ ...prev, password: undefined }));
            }
        }
    };

    const handleSignIn = () => {
        navigation.navigate('Login');
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
                        {/* Title Section */}
                        <View style={styles.titleSection}>
                            <TextComp isDynamic text="Begin Journey" style={styles.title} />
                            <TextComp
                                isDynamic
                                text="Create an account to save your readings."
                                style={styles.subtitle}
                            />
                        </View>

                        {/* Form Section */}
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
                                    onBlur={() => handleBlur('email')}
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

                            <View style={styles.inputGroup}>
                                <TextComp isDynamic text="Password" style={styles.inputLabel} />
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
                        </View>

                        {/* Button Section */}
                        <View style={styles.buttonSection}>
                            <ButtonComp
                                title="CREATE ACCOUNT"
                                onPress={handleCreateAccount}
                         
                            />
                        </View>

                        {/* Sign In Link */}
                        <View style={styles.signInContainer}>
                            <TextComp isDynamic text="Already have an account? " style={styles.signInText} />
                            <TouchableOpacity onPress={handleSignIn}>
                                <TextComp isDynamic text="Sign In" style={styles.signInLink} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </WrapperContainer>
    );
};

export default Signup;
