import { useMemo } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '@/styles/scaling';
import fontFamily from '@/styles/fontFamily';
import { commonColors } from '@/styles/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const useRTLStyles = (_isRTL: boolean) => {
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
                    paddingHorizontal: moderateScale(24),
                    paddingTop: moderateScale(20),
                },
                titleSection: {
                    // marginBottom: moderateScale(32),
                },
                title: {
                    fontSize: moderateScale(28),
                    fontFamily: fontFamily.times,
                    color: commonColors.black,
                    marginBottom: moderateScale(12),
                    textAlign: 'left',
                },
                subtitle: {
                    fontSize: moderateScale(16),
                    fontFamily: fontFamily.regular,
                    color: '#666666',
                    lineHeight: moderateScale(24),
                    textAlign: 'left',
                },
                cardsSection: {
                    alignItems: 'center',
                    // marginBottom: moderateScale(40),
                    minHeight: moderateScale(400),
                    // position: 'relative',
                    width: moderateScale(400),
                    alignSelf: 'center',
                },
                cardContainer: {
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                card: {
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 8,
                    borderRadius: moderateScale(16),
                    overflow: 'hidden',
                    backgroundColor: commonColors.white,
                },
                buttonsSection: {
                    marginTop: moderateScale(20),
                },
                shuffleButton: {
                    backgroundColor: '#4E3F86',
                    borderRadius: moderateScale(12),
                    height: moderateScale(52),
                    // marginBottom: moderateScale(16),
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 4,
                },
                shuffleButtonText: {
                    color: commonColors.white,
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.semiBold,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                },
                drawButton: {
                    backgroundColor: '#7A7A7A',
                    borderRadius: moderateScale(30),
                    height: moderateScale(50),
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 4,
                },
                drawButtonText: {
                    color: commonColors.white,
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.semiBold,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                },
            }),
        []
    );
};

export default useRTLStyles;
