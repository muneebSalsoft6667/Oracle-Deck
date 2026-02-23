import { commonColors, ThemeType } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { moderateScale } from '@/styles/scaling';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const useRTLStyles = (isRTL: boolean, _theme: ThemeType) => {
    return useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#F6F4F1',
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F6F4F1',
        },
        contentContainer: {
            paddingHorizontal: moderateScale(14),
            paddingBottom: moderateScale(24),
        },
        headerContainer: {
            paddingHorizontal: 10,
            paddingVertical: 8,
            minHeight: 0,
            marginBottom: moderateScale(6),
        },
        headerContentContainer: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: '#E2DDD4',
            paddingBottom: moderateScale(10),
            marginBottom: moderateScale(12),
        },
        headerTextContainer: {
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            marginRight: isRTL ? 0 : moderateScale(12),
            marginLeft: isRTL ? moderateScale(12) : 0,
        },
        headerDate: {
            fontSize: moderateScale(12),
            fontFamily: fontFamily.regular,
            color: '#8B8278',
            textAlign: isRTL ? 'right' : 'left',
            marginBottom: moderateScale(4),
        },
        headerGreeting: {
            fontSize: moderateScale(20),
            fontFamily: fontFamily.semiBold,
            color: '#2A2523',
            textAlign: isRTL ? 'right' : 'left',
        },
        topOptionRow: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            gap: moderateScale(10),
            marginBottom: moderateScale(14),
        },
        optionCard: {
            flex: 1,
            borderRadius: moderateScale(14),
            paddingVertical: moderateScale(16),
            paddingHorizontal: moderateScale(10),
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: moderateScale(170),
        },
        optionCardActive: {
            backgroundColor: '#4E3A8A',
            borderColor: '#4E3A8A',
        },
        optionCardInactive: {
            backgroundColor: '#FFFFFF',
            borderColor: '#E5E1DA',
        },
        optionIconCircle: {
            width: moderateScale(32),
            height: moderateScale(32),
            borderRadius: moderateScale(5),
            backgroundColor: 'rgba(255,255,255,0.18)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: moderateScale(8),
        },
        optionIconText: {
            fontSize: moderateScale(10),
            fontFamily: fontFamily.bold,
            color: commonColors.white,
            textAlign: 'center',
        },
        optionText: {
            fontSize: moderateScale(11),
            fontFamily: fontFamily.medium,
            textAlign: 'center',
        },
        optionTextActive: {
            color: commonColors.white,
        },
        optionTextInactive: {
            color: '#333333',
        },
        sectionTitle: {
            fontSize: moderateScale(20),
            fontFamily: fontFamily.times,
            color: '#2A2523',
            marginBottom: moderateScale(8),
            textAlign: isRTL ? 'right' : 'left',
        },
        reflectionCard: {
            backgroundColor: commonColors.white,
            borderRadius: moderateScale(16),
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#E7E0D8',
            marginBottom: moderateScale(18),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 2,
            position: 'relative',
        },
        reflectionCardWrap: {
            width: moderateScale(330),
        },
        reflectionListContainer: {
            paddingBottom: moderateScale(12),
        },
        reflectionListSeparator: {
            width: moderateScale(10),
        },
        badgeContainer: {
            position: 'absolute',
            top: moderateScale(10),
            right: moderateScale(10),
            backgroundColor: 'rgba(80, 124, 65, 0.9)',
            borderRadius: moderateScale(10),
            paddingHorizontal: moderateScale(8),
            paddingVertical: moderateScale(3),
            zIndex: 2,
        },
        badgeText: {
            fontSize: moderateScale(9),
            fontFamily: fontFamily.semiBold,
            color: commonColors.white,
            letterSpacing: 0.5,
        },
        reflectionImage: {
            borderTopLeftRadius: moderateScale(16),
            borderTopRightRadius: moderateScale(16),
            backgroundColor: '#EFE8DE',
        },
        reflectionActionButton: {
            position: 'absolute',
            top: moderateScale(10),
            right: moderateScale(10),
            zIndex: 3,
            backgroundColor: commonColors.white,
            borderRadius: moderateScale(999),
            paddingVertical: moderateScale(5),
            paddingHorizontal: moderateScale(10),
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        },
        reflectionActionDot: {
            width: moderateScale(8),
            height: moderateScale(8),
            borderRadius: moderateScale(4),
            backgroundColor: '#4BCB7D',
            marginRight: moderateScale(8),
        },
        reflectionActionText: {
            fontSize: moderateScale(11),
            fontFamily: fontFamily.semiBold,
            color: '#575757',
            letterSpacing: 0.4,
        },
        reflectionContent: {
            paddingHorizontal: moderateScale(12),
            paddingVertical: moderateScale(12),
        },
        reflectionSubTitle: {
            fontSize: moderateScale(10),
            fontFamily: fontFamily.regular,
            color: '#9A8F84',
            textAlign: 'center',
            letterSpacing: 1,
            marginBottom: moderateScale(3),
        },
        reflectionCategory: {
            fontSize: moderateScale(12),
            fontFamily: fontFamily.medium,
            color: '#7C7065',
            textAlign: 'center',
            letterSpacing: 1,
            marginBottom: moderateScale(6),
        },
        reflectionTitle: {
            fontSize: moderateScale(26),
            fontFamily: fontFamily.times,
            color: '#2A2523',
            textAlign: 'center',
            marginBottom: moderateScale(8),
        },
        reflectionDescription: {
            fontSize: moderateScale(12),
            fontFamily: fontFamily.regular,
            color: '#61584F',
            textAlign: 'center',
            lineHeight: moderateScale(18),
        },
        recentHeaderRow: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: moderateScale(10),
        },
        recentHeaderTitle: {
            fontSize: moderateScale(20),
            fontFamily: fontFamily.times,
            color: commonColors.black,
        },
        viewJournalText: {
            fontSize: moderateScale(12),
            fontFamily: fontFamily.bold,
            color: '#6159A6',
            textDecorationLine: 'underline',
            marginRight:10
        },
        recentListContainer: {
            gap: moderateScale(8),
        },
        recentItemCard: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            backgroundColor: commonColors.white,
            borderRadius: moderateScale(14),
            borderWidth: 1,
            borderColor: '#E2DDD4',
            marginBottom: moderateScale(8),
            padding: moderateScale(9),
            gap: moderateScale(10),
        },
        recentTextBlock: {
            flex: 1,
        },
        recentItemTitle: {
            fontSize: moderateScale(14),
            fontFamily: fontFamily.semiBold,
            color: commonColors.black,
            marginBottom: moderateScale(2),
        },
        recentItemMeta: {
            fontSize: moderateScale(12),
            fontFamily: fontFamily.regular,
            color: '#8B8278',
        },
        listFooterSpace: {
            height: moderateScale(12),
        },
    }), [isRTL]);
};

export default useRTLStyles;