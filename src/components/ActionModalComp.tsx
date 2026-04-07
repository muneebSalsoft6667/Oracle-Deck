import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import ButtonComp from './ButtonComp';
import ImageComp from './ImageComp';
import TextComp from './TextComp';
import { moderateScale } from '@/styles/scaling';
import fontFamily from '@/styles/fontFamily';

interface ActionModalCompProps {
    isVisible: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    buttonText: string;
    onButtonPress: () => void;
    imageSource?: { uri: string } | number;
    imageComponent?: React.ReactNode;
    lottieSource?: object | number;
    lottieLoop?: boolean;
    lottieAutoPlay?: boolean;
    containerStyle?: ViewStyle;
    backdropOpacity?: number;
}

const ActionModalComp: React.FC<ActionModalCompProps> = ({
    isVisible,
    onClose,
    title,
    description,
    buttonText,
    onButtonPress,
    imageSource,
    imageComponent,
    lottieSource,
    lottieLoop = false,
    lottieAutoPlay = true,
    containerStyle,
    backdropOpacity = 0.65,
}) => {
    const renderVisual = () => {
        if (lottieSource) {
            return (
                <LottieView
                    source={lottieSource}
                    autoPlay={lottieAutoPlay}
                    loop={lottieLoop}
                    style={styles.lottie}
                />
            );
        }

        if (imageComponent) {
            return imageComponent;
        }

        if (imageSource) {
            return <ImageComp source={imageSource} width={moderateScale(56)} height={moderateScale(56)} />;
        }

        return (
            <View style={styles.defaultIcon}>
                <TextComp isDynamic text="✓" style={styles.defaultIconText} />
            </View>
        );
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            backdropOpacity={backdropOpacity}
            animationIn="zoomIn"
            animationOut="zoomOut"
            useNativeDriver
            style={styles.modal}
            statusBarTranslucent
        >
            <View style={[styles.container, containerStyle]}>
                {renderVisual()}
                <TextComp isDynamic text={title} style={styles.title} />
                {!!description && <TextComp isDynamic text={description} style={styles.description} />}
                <ButtonComp
                    title={buttonText}
                    onPress={onButtonPress}
                    width="100%"
                    height={moderateScale(48)}
                    style={styles.button}
                    textStyle={styles.buttonText}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        margin: moderateScale(12),
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '100%',
        maxWidth: moderateScale(340),
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(34),
        paddingHorizontal: moderateScale(24),
        paddingVertical: moderateScale(24),
        alignItems: 'center',
    },
    defaultIcon: {
        width: moderateScale(52),
        height: moderateScale(52),
        borderRadius: moderateScale(26),
        backgroundColor: '#22CDAA',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: moderateScale(2),
    },
    lottie: {
        width: moderateScale(100),
        height: moderateScale(100),
        marginTop: moderateScale(2),
    },
    defaultIconText: {
        color: '#FFFFFF',
        fontSize: moderateScale(22),
        fontFamily: fontFamily.bold,
        textAlign: 'center',
    },
    title: {
        marginTop: moderateScale(20),
        fontSize: moderateScale(25),
        color: '#1E1E1E',
        fontFamily: fontFamily.times,
        textAlign: 'center',
    },
    description: {
        marginTop: moderateScale(10),
        fontSize: moderateScale(12),
        lineHeight: moderateScale(25),
        color: '#5A5852',
        fontFamily: fontFamily.regular,
        textAlign: 'center',
        paddingHorizontal: moderateScale(8),
    },
    button: {
        marginTop: moderateScale(22),
        marginBottom: moderateScale(2),
    },
    buttonText: {
        fontSize: moderateScale(22),
        lineHeight: moderateScale(24),
        letterSpacing: 0,
    },
});

export default ActionModalComp;
