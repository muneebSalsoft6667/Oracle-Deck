import { useTheme } from '@/context/ThemeContext';
import {  Colors, commonColors } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { moderateScale } from '@/styles/scaling';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const useRTLStyles = (isRTL: boolean) => {
    const { theme } = useTheme();
    const colors = Colors[theme];
    return useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#f9f7f2',
        },
        listContent: {
            paddingHorizontal: moderateScale(16),
            paddingTop: moderateScale(20),
            marginTop:20,
        },
        dateHeader: {
            fontSize: moderateScale(14),
            fontFamily: fontFamily.bold,
            color: colors.textSecondary,
            letterSpacing: 2.5,
            textAlign: isRTL ? 'right' : 'left',
        },
        itemCard: {
            backgroundColor: commonColors.white,
            borderRadius: moderateScale(20),
            paddingHorizontal: moderateScale(16),
            paddingVertical: moderateScale(14),
            minHeight: moderateScale(108),
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            shadowColor: colors.text,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 2,
            marginHorizontal: moderateScale(5),
        },
        itemLeftContent: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            flex: 1,
            minHeight: moderateScale(76),
        },
        imageStackContainer: {
            width: moderateScale(96),
            height: moderateScale(76),
            position: 'relative',
            borderRadius: moderateScale(12),
            justifyContent: 'center',
        },
        imageStackItem: {
            position: 'absolute',
            top: 0,
        },
        itemTextContent: {
            flex: 1,
            marginLeft: isRTL ? 0 : moderateScale(12),
            marginRight: isRTL ? moderateScale(12) : 0,
            justifyContent: 'center',
        },
        itemTitle: {
            fontSize: moderateScale(15),
            fontFamily: fontFamily.times,
            color: colors.text,
            marginBottom: moderateScale(2),
            textAlign: isRTL ? 'right' : 'left',
            fontWeight: 'bold',
        },
        itemSubtitle: {
            fontSize: moderateScale(14),
            fontFamily: fontFamily.regular,
            color: colors.textSecondary,
        },
        arrowContainer: {
            width: moderateScale(28),
            alignItems: 'center',
            justifyContent: 'center',
        },
        arrowIcon: {
            transform: [{ rotate: isRTL ? '0deg' : '180deg' }],
            opacity: 0.45,
        },
        sectionSpacing: {
            height: moderateScale(14),
        },
        emptyContainer: {
            paddingTop: moderateScale(40),
            alignItems: 'center',
        },
        emptyText: {
            fontSize: moderateScale(14),
            fontFamily: fontFamily.regular,
            color: colors.textSecondary,
        },
    }), [isRTL, colors.text, colors.textSecondary]);
};
export default useRTLStyles;