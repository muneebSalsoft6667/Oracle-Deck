import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale, verticalScale } from '@/styles/scaling';
import fontFamily from '@/styles/fontFamily';
import { Colors } from '@/styles/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const useRTLStyles = (isRTL: boolean, theme: 'light' | 'dark' = 'light') => {
    const colors = Colors[theme];
    
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#F9F7F2', // Light cream/off-white background
        },
        slideContainer: {
            width: SCREEN_WIDTH,
            flex: 1,
        },
        imageContainer: {
            width: '100%',
            height: '58%', // Top 58% for image - adjusted to match design
            overflow: 'hidden',
        },
        contentContainer: {
            flex: 1,
            backgroundColor: '#F9F7F2', // Light cream/off-white
            paddingHorizontal: moderateScale(24),
            paddingTop: moderateScale(16),
            paddingBottom: moderateScale(32),
            justifyContent: 'flex-start',
        },
        dotsContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: moderateScale(20),
            gap: moderateScale(6),
        },
        dot: {
            width: moderateScale(6),
            height: moderateScale(6),
            borderRadius: moderateScale(3),
            backgroundColor: '#D4C5E8', // Light lavender/purple
            // marginHorizontal: moderateScale(1),
        },
        dotActive: {
            backgroundColor: '#4E3F86', // Dark purple
            width: moderateScale(15),
            height: moderateScale(6),
        },
        title: {
            fontSize: moderateScale(28),
            fontFamily: fontFamily.times, // Serif font for title
            color: '#2C2C2C', // Dark grey/black
            textAlign: 'center',
            marginBottom: moderateScale(12),
            lineHeight: moderateScale(34),
            fontWeight: '400',
        },
        description: {
            fontSize: moderateScale(15),
            fontFamily: fontFamily.regular, // Sans-serif for description
            color: '#454545', // Dark grey
            textAlign: 'center',
            marginBottom: moderateScale(28),
            lineHeight: moderateScale(22),
            paddingHorizontal: moderateScale(4),
        },
        button: {
            width: '90%',
            height: moderateScale(52),
            marginTop: 0,
            marginBottom: moderateScale(12),
        },
        skipButton: {
            alignSelf: 'center',
            paddingVertical: moderateScale(10),
            paddingHorizontal: moderateScale(16),
            marginTop: moderateScale(4),
        },
        skipText: {
            fontSize: moderateScale(16),
            fontFamily: fontFamily.medium,
            color: '#9E9E9E', // Light grey
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            // marginTop: moderateScale(2),
            textDecorationLine: 'underline',
            bottom: moderateScale(5),
        },
    });
};

export default useRTLStyles;
