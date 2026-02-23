import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import fontFamily from '@/styles/fontFamily';

const useRTLStyles = (isRTL: boolean) => {
    const { theme } = useTheme();
    const colors = Colors[theme];
    return useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#F6F4F1',
        },

        content: {
            flex: 1,
            paddingHorizontal: moderateScale(16),
            marginTop: moderateScale(20),
            gap: moderateScale(10),
        },
        sectionTitle: {
            fontSize: moderateScale(20),
            fontFamily: fontFamily.times,
            color: '#2A2523',
            marginTop: moderateScale(8),
            marginBottom: moderateScale(8),
            textAlign: isRTL ? 'right' : 'left',
        },
        categoriesContainer: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            rowGap: moderateScale(12),
            marginBottom: moderateScale(20),
        },
        categoryChip: {
            width: '47%',
            minHeight: moderateScale(40),
            borderRadius: moderateScale(30),
            borderWidth: 1,
            borderColor: '#D1C8BD',
            backgroundColor: '#F6F4F1',
            alignItems: 'center',
            justifyContent: 'center',
        },
        categoryChipActive: {
            borderColor: '#7E7670',
            borderWidth: 2,
        },
        categoryText: {
            fontSize: moderateScale(16),
            fontFamily: fontFamily.medium,
            color: '#9A8F84',
        },
        categoryTextActive: {
            color: '#4B3F33',
        },
        suggestedList: {
            paddingBottom: moderateScale(20),
            paddingTop: moderateScale(4),
        },
        suggestedSeparator: {
            width: moderateScale(16),
        },
        suggestedCard: {
            width: moderateScale(140),
            backgroundColor: '#FFFFFF',
            borderRadius: moderateScale(18),
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 2,
        },
        suggestedImage: {
            borderTopLeftRadius: moderateScale(18),
            borderTopRightRadius: moderateScale(18),
        },
        suggestedCardBody: {
            paddingHorizontal: moderateScale(14),
            paddingVertical: moderateScale(14),
            alignItems: 'center',
            borderTopWidth: 1,
            borderTopColor: '#EFE7DD',
        },
        suggestedLabel: {
            fontSize: moderateScale(10),
            fontFamily: fontFamily.regular,
            color: colors.textSecondary,
            letterSpacing: 2,
            marginBottom: moderateScale(10),
            textAlign: 'center',
        },
        suggestedTitle: {
            fontSize: moderateScale(18),
            fontFamily: fontFamily.times,
            color: colors.text,
            textAlign: 'center',
        },
        emptyText: {
            fontSize: moderateScale(14),
            fontFamily: fontFamily.regular,
            color: colors.textSecondary,
            marginTop: moderateScale(8),
        },
    }), [colors]);
};
export default useRTLStyles;        
