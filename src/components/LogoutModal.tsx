import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ModalComp from './ModalComp';
import ButtonComp from './ButtonComp';
import TextComp from './TextComp';
import { logoutIcon as LogoutIcon } from '@/assets/icons';
import { moderateScale } from '@/styles/scaling';
import fontFamily from '@/styles/fontFamily';

interface LogoutModalProps {
    isVisible: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isVisible, onClose, onConfirm }) => {
    const styles = useStyles();

    return (
        <ModalComp
            isVisible={isVisible}
            onClose={onClose}
            containerStyle={styles.modalContainer}
            backdropOpacity={0.6}
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInTiming={200}
            animationOutTiming={200}
            centered={true}
        >
            <View style={styles.content}>
                {/* Icon Container with Light Pink Background */}
                <View style={styles.iconContainer}>
                    <View style={styles.iconCircle}>
                        <LogoutIcon 
                          
                            fill="#CD0105" 
                        />
                    </View>
                </View>

                {/* Title */}
                <TextComp
                    isDynamic
                    text="Leave the Sanctuary?"
                    style={styles.title}
                />

                {/* Description */}
                <TextComp
                    isDynamic
                    text="You'll need to log in again to access your journal and bookmarks."
                    style={styles.description}
                />

                {/* Primary Button - LOGOUT ACCOUNT */}
                <ButtonComp
                    title="LOGOUT ACCOUNT"
                    onPress={onConfirm}
                />

                {/* Secondary Action - STAY HERE */}
                <TouchableOpacity
                    onPress={onClose}
                    style={styles.stayButton}
                    activeOpacity={0.7}
                >
                    <TextComp
                        isDynamic
                        text="STAY HERE"
                        style={styles.stayText}
                    />
                </TouchableOpacity>
            </View>
        </ModalComp>
    );
};

const useStyles = () => {
    return StyleSheet.create({
        modalContainer: {
            backgroundColor: '#FFFFFF',
            borderRadius: moderateScale(24),
            padding: moderateScale(24),
            paddingTop: moderateScale(32),
            paddingBottom: moderateScale(32),
            alignItems: 'center',
            maxWidth: '90%',
            width: '90%',
            alignSelf: 'center',
            margin: 0,
        },
        content: {
            width: '100%',
            alignItems: 'center',
        },
        iconContainer: {
            marginBottom: moderateScale(20),
        },
        iconCircle: {
            width: moderateScale(64),
            height: moderateScale(64),
            borderRadius: moderateScale(32),
            backgroundColor: '#FFE5E5', // Light pink background
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            fontSize: moderateScale(24),
            fontFamily: fontFamily.times,
            color: '#2C2C2C', // Dark grey
            textAlign: 'center',
            marginBottom: moderateScale(12),
            lineHeight: moderateScale(28),
        },
        description: {
            fontSize: moderateScale(15),
            fontFamily: fontFamily.regular,
            color: '#454545', // Dark grey
            textAlign: 'center',
            marginBottom: moderateScale(28),
            lineHeight: moderateScale(22),
            paddingHorizontal: moderateScale(8),
        },
        logoutButton: {
            width: '100%',
            height: moderateScale(52),
            borderRadius: moderateScale(26), // More oval/rounded
            marginTop: 0,
            marginBottom: moderateScale(16),
        },
        stayButton: {
            paddingVertical: moderateScale(12),
            paddingHorizontal: moderateScale(16),
        },
        stayText: {
            fontSize: moderateScale(14),
            fontFamily: fontFamily.medium,
            color: '#454545', // Dark grey
            textTransform: 'uppercase',
            letterSpacing: 0.5,
        },
    });
};

export default LogoutModal;
