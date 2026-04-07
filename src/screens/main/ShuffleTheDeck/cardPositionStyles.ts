import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { moderateScale } from '@/styles/scaling';
import fontFamily from '@/styles/fontFamily';
import { commonColors } from '@/styles/colors';

const useRTLStyles = (isRTL: boolean) => {
    return useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flex: 1,
                    backgroundColor: '#F9F7F2',
                },
                scrollView: {
                    flex: 1,
                },
                scrollContent: {
                    paddingBottom: moderateScale(40),
                },
                content: {
                    flex: 1,
                    paddingHorizontal: moderateScale(20),
                    paddingTop: moderateScale(20),
                },
                positionTitleContainer: {
                    marginBottom: moderateScale(32),
                    alignItems: 'center',
                },
                positionTitle: {
                    fontSize: moderateScale(18),
                    fontFamily: fontFamily.medium,
                    color: commonColors.black,
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                },
                cardWrapper: {
                    alignItems: 'center',
                    marginBottom: moderateScale(40),
                },
                cardContainer: {
                    width: moderateScale(280),
                    height: moderateScale(420),
                    borderRadius: moderateScale(20),
                    overflow: 'hidden',
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 12,
                    elevation: 8,
                },
                cardTextOverlay: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    paddingVertical: moderateScale(20),
                    paddingHorizontal: moderateScale(16),
                    borderBottomLeftRadius: moderateScale(20),
                    borderBottomRightRadius: moderateScale(20),
                },
                cardSubtitle: {
                    fontSize: moderateScale(11),
                    fontFamily: fontFamily.regular,
                    color: '#9E9E9E',
                    textAlign: 'center',
                    marginBottom: moderateScale(4),
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                },
                cardTitleText: {
                    fontSize: moderateScale(24),
                    fontFamily: fontFamily.times,
                    color: commonColors.black,
                    textAlign: 'center',
                    marginBottom: moderateScale(8),
                },
                cardDescription: {
                    fontSize: moderateScale(13),
                    fontFamily: fontFamily.regular,
                    color: '#666666',
                    textAlign: 'center',
                    lineHeight: moderateScale(20),
                },
                viewButton: {
                    backgroundColor: '#6B46C1',
                    borderRadius: moderateScale(12),
                    marginTop: moderateScale(0),
                    alignSelf: 'stretch',
                },
                viewButtonText: {
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.bold,
                },
            }),
        [isRTL]
    );
};

export default useRTLStyles;
