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
                    paddingHorizontal: moderateScale(24),
                    paddingTop: moderateScale(20),
                },
                cardContainer: {
                    marginBottom: moderateScale(16),
                },
                card: {
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    backgroundColor: commonColors.white,
                    borderRadius: moderateScale(12),
                    padding: moderateScale(16),
                    alignItems: 'center',
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 3,
                    elevation: 2,
                    minHeight: moderateScale(80),
                },
                cardIconContainer: {
                    marginRight: isRTL ? 0 : moderateScale(16),
                    marginLeft: isRTL ? moderateScale(16) : 0,
                },
                iconBackground: {
                    width: moderateScale(40),
                    height: moderateScale(40),
                    borderRadius: moderateScale(8),
                    backgroundColor: '#F5F5F5',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                cardContent: {
                    flex: 1,
                },
                cardTitle: {
                    fontSize: moderateScale(16),
                    fontFamily: fontFamily.semiBold,
                    color: commonColors.black,
                    marginBottom: moderateScale(4),
                },
                cardSubtitle: {
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.regular,
                    color: '#9E9E9E',
                },
                arrowContainer: {
                    marginLeft: isRTL ? 0 : moderateScale(12),
                    marginRight: isRTL ? moderateScale(12) : 0,
                },
                quoteContainer: {
                    marginTop: moderateScale(32),
                    alignItems: 'center',
                    paddingHorizontal: moderateScale(20),
                },
                quoteText: {
                    fontSize: moderateScale(16),
                    fontFamily: fontFamily.times,
                    color: '#4E3F86',
                    fontStyle: 'italic',
                    textAlign: 'center',
                    lineHeight: moderateScale(24),
                },
            }),
        [isRTL]
    );
};

export default useRTLStyles;
