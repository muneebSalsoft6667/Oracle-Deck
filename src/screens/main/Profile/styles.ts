import { Colors, commonColors } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { moderateScale } from '@/styles/scaling';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

const useRTLStyles = (isRTL: boolean) => {
    const { theme } = useTheme();
    const colors = Colors[theme];

    return useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#F2F1EE',
        },
        content: {
            flex: 1,
            alignItems: 'center',
            paddingTop: moderateScale(22),
            paddingHorizontal: moderateScale(20),
        },
        avatar: {
            borderWidth: 2,
            borderColor: commonColors.white,
        },
        nameText: {
            marginTop: moderateScale(12),
            fontSize: moderateScale(22),
            fontFamily: fontFamily.times,
            color: '#1D1D1B',
            fontWeight: '700',
            textAlign: 'center',
        },
        emailText: {
            fontSize: moderateScale(20),
            fontFamily: fontFamily.regular,
            color: commonColors.gray600,
            textAlign: 'center',
        },
        infoCard: {
            width: '100%',
            marginTop: moderateScale(22),
            backgroundColor: '#F7F7F7',
            borderRadius: moderateScale(18),
            paddingHorizontal: moderateScale(20),
            paddingVertical: moderateScale(16),
            gap: moderateScale(16),
        },
        infoRow: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'flex-start',
        },
        iconWrap: {
            width: moderateScale(20),
            alignItems: 'center',
            marginTop: moderateScale(4),
        },
        infoTextWrap: {
            flex: 1,
            marginLeft: isRTL ? 0 : moderateScale(10),
            marginRight: isRTL ? moderateScale(10) : 0,
        },
        infoLabel: {
            fontSize: moderateScale(11),
            lineHeight: moderateScale(14),
            fontFamily: fontFamily.medium,
            letterSpacing: 2,
            color: '#B8B2AA',
            textAlign: isRTL ? 'right' : 'left',
        },
        infoValue: {
            fontSize: moderateScale(16),
            lineHeight: moderateScale(28),
            fontFamily: fontFamily.regular,
            color: colors.text,
            textAlign: isRTL ? 'right' : 'left',
        },
        buttonContainer: {
            paddingHorizontal: moderateScale(20),
            paddingBottom: moderateScale(18),
        },
      
    }), [colors.text, isRTL]);
};

export default useRTLStyles;