import { moderateScale } from '@/styles/scaling';
import fontFamily from '@/styles/fontFamily';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const useRTLStyles = (isRTL: boolean) => {
    return useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#F2F1EE',
        },
        content: {
            flex: 1,
            alignItems: 'center',
            paddingTop: moderateScale(22),
            paddingHorizontal: moderateScale(22),
        },
        avatarPressable: {
            position: 'relative',
        },
        avatar: {
            borderWidth: 2,
            borderColor: '#FFFFFF',
        },
        cameraBadge: {
            position: 'absolute',
            bottom: moderateScale(0),
            right: isRTL ? undefined : moderateScale(-2),
            left: isRTL ? moderateScale(-2) : undefined,
            width: moderateScale(30),
            height: moderateScale(30),
            borderRadius: moderateScale(15),
            backgroundColor: '#4E3F86',
            borderWidth: 2,
            borderColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
        },
        plusVertical: {
            position: 'absolute',
            width: moderateScale(2.5),
            height: moderateScale(12),
            borderRadius: moderateScale(2),
            backgroundColor: '#FFFFFF',
        },
        plusHorizontal: {
            width: moderateScale(12),
            height: moderateScale(2.5),
            borderRadius: moderateScale(2),
            backgroundColor: '#FFFFFF',
        },
        changeAvatarText: {
            marginTop: moderateScale(10),
            fontSize: moderateScale(12),
            lineHeight: moderateScale(16),
            fontFamily: fontFamily.regular,
            color: '#4B4A46',
        },
        formSection: {
            width: '100%',
            marginTop: moderateScale(34),
        },
        label: {
            fontSize: moderateScale(16),
            color: '#4B4A46',
            fontFamily: fontFamily.regular,
            textAlign: isRTL ? 'right' : 'left',
            marginBottom: moderateScale(8),
            marginTop: moderateScale(2),
        },
        displayInput: {
            height: moderateScale(44),
            borderRadius: moderateScale(22),
            borderWidth: 1,
            borderColor: '#CDC9C2',
            backgroundColor: '#F6F6F6',
            paddingHorizontal: moderateScale(18),
            color: '#4B4A46',
            fontSize: moderateScale(16),
            fontFamily: fontFamily.regular,
            marginBottom: moderateScale(18),
            textAlign: isRTL ? 'right' : 'left',
        },
        emailInput: {
            height: moderateScale(44),
            borderRadius: moderateScale(22),
            borderWidth: 1,
            borderColor: '#DCCFAE',
            backgroundColor: '#ECE3CF',
            paddingHorizontal: moderateScale(18),
            color: '#4B4A46',
            fontSize: moderateScale(16),
            fontFamily: fontFamily.regular,
            marginBottom: moderateScale(8),
            textAlign: isRTL ? 'right' : 'left',
        },
        warningText: {
            fontSize: moderateScale(12),
            color: '#E02D2D',
            fontFamily: fontFamily.times,
            textAlign: isRTL ? 'right' : 'left',
            fontWeight: '700',
        },
        buttonContainer: {
            paddingHorizontal: moderateScale(22),
            paddingBottom: moderateScale(18),
        },
    }), [isRTL]);
};

export default useRTLStyles;