import { StyleSheet } from 'react-native';
import { moderateScale } from '@/styles/scaling';
import fontFamily from '@/styles/fontFamily';
import { commonColors } from '@/styles/colors';

const useRTLStyles = (isRTL: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#F3F2EF',
        },
        scrollView: {
            flex: 1,
        },
        scrollContent: {
            paddingHorizontal: moderateScale(16),
            paddingTop: moderateScale(20),
            paddingBottom: moderateScale(30),
        },
        planCard: {
            borderRadius: moderateScale(16),
            padding: moderateScale(20),
            marginBottom: moderateScale(16),
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
        },
        monthlyCard: {
            backgroundColor: '#4E3F86',
        },
        monthlyCardSelected: {
            backgroundColor: '#5A4A9A',
            borderWidth: 2,
            borderColor: '#17A2B8',
        },
        annualCard: {
            backgroundColor: commonColors.white,
        },
        annualCardSelected: {
            backgroundColor: '#F0EDFF',
            borderWidth: 2,
            borderColor: '#4E3F86',
        },
        annualCardContainer: {
            position: 'relative',
            marginBottom: moderateScale(16),
        },
        recommendedBadge: {
            position: 'absolute',
            top: moderateScale(-8),
            right: moderateScale(16),
            backgroundColor: '#4E3F86',
            borderRadius: moderateScale(8),
            paddingHorizontal: moderateScale(12),
            paddingVertical: moderateScale(4),
            zIndex: 10,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 5,
        },
        recommendedText: {
            color: commonColors.white,
            fontSize: moderateScale(10),
            fontFamily: fontFamily.bold,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
        },
        monthlyTitle: {
            color: commonColors.white,
            fontSize: moderateScale(18),
            fontFamily: fontFamily.semiBold,
            marginBottom: moderateScale(8),
        },
        monthlyPrice: {
            color: commonColors.white,
            fontSize: moderateScale(32),
            fontFamily: fontFamily.bold,
            lineHeight: moderateScale(38),
        },
        monthlyPeriod: {
            color: commonColors.white,
            fontSize: moderateScale(14),
            fontFamily: fontFamily.medium,
            marginLeft: moderateScale(8),
            alignSelf: 'flex-end',
            paddingBottom: moderateScale(4),
        },
        annualHeader: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: moderateScale(8),
        },
        annualTitle: {
            color: commonColors.black,
            fontSize: moderateScale(18),
            fontFamily: fontFamily.semiBold,
        },
        annualTitleSelected: {
            color: '#4E3F86',
        },
        saveText: {
            color: commonColors.black,
            fontSize: moderateScale(12),
            fontFamily: fontFamily.medium,
        },
        saveTextSelected: {
            color: '#4E3F86',
        },
        annualPrice: {
            color: commonColors.black,
            fontSize: moderateScale(32),
            fontFamily: fontFamily.bold,
            lineHeight: moderateScale(38),
        },
        annualPriceSelected: {
            color: '#4E3F86',
        },
        annualPeriod: {
            color: commonColors.black,
            fontSize: moderateScale(14),
            fontFamily: fontFamily.medium,
            marginLeft: moderateScale(8),
            alignSelf: 'flex-end',
            paddingBottom: moderateScale(4),
        },
        annualPeriodSelected: {
            color: '#4E3F86',
        },
        priceRow: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'flex-end',
        },
        featuresSection: {
            marginTop: moderateScale(8),
        },
        featuresTitle: {
            color: commonColors.black,
            fontSize: moderateScale(18),
            fontFamily: fontFamily.semiBold,
            marginBottom: moderateScale(16),
        },
        featureCard: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            backgroundColor: commonColors.white,
            borderRadius: moderateScale(12),
            padding: moderateScale(16),
            marginBottom: moderateScale(12),
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 2,
        },
        featureText: {
            color: commonColors.black,
            fontSize: moderateScale(14),
            fontFamily: fontFamily.medium,
            marginLeft: isRTL ? 0 : moderateScale(12),
            marginRight: isRTL ? moderateScale(12) : 0,
            flex: 1,
        },
        buttonContainer: {
            marginTop: moderateScale(32),
            paddingHorizontal: moderateScale(4),
            width: '100%',
        },
        subscribeButton: {
            borderRadius: moderateScale(16),
        },
    });
};

export default useRTLStyles;
