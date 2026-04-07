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
                    paddingBottom: moderateScale(30),
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
                    marginBottom: moderateScale(12),
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 3,
                    elevation: 2,
                    minHeight: moderateScale(100),
                },
                cardIconContainer: {
                    width: moderateScale(40),
                    height: moderateScale(40),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: isRTL ? 0 : moderateScale(16),
                    marginLeft: isRTL ? moderateScale(16) : 0,
                },
                cardContent: {
                    flex: 1,
                },
                chapterNumber: {
                    fontSize: moderateScale(11),
                    fontFamily: fontFamily.medium,
                    color: '#9E9E9E',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    marginBottom: moderateScale(4),
                },
                chapterTitle: {
                    fontSize: moderateScale(15),
                    fontFamily: fontFamily.semiBold,
                    color: commonColors.black,
                    marginBottom: moderateScale(6),
                },
                chapterDescription: {
                    fontSize: moderateScale(12),
                    fontFamily: fontFamily.regular,
                    color: '#666666',
                    lineHeight: moderateScale(20),
                },
            }),
        [isRTL]
    );
};

export default useRTLStyles;
