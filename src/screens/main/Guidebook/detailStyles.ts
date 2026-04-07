import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { moderateScale } from '@/styles/scaling';
import fontFamily from '@/styles/fontFamily';
import { Colors, commonColors } from '@/styles/colors';
import { useTheme } from '@/context/ThemeContext';

const useRTLStyles = (isRTL: boolean) => {
    const { theme } = useTheme();
    const colors = Colors[theme];
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
                header: {
                    alignItems: 'center',
                    marginBottom: moderateScale(16),
                },
                headerText: {
                    fontSize: moderateScale(11),
                    fontFamily: fontFamily.medium,
                    color: '#9E9E9E',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                },
                titleSection: {
                    // alignItems: 'center',
                    marginBottom: moderateScale(32),
                },
                title: {
                    fontSize: moderateScale(28),
                    fontFamily: fontFamily.times,
                    color: commonColors.black,
                    textAlign: 'left',
                },
                paragraphContainer: {
                    marginBottom: moderateScale(20),
                },
                paragraph: {
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.regular,
                    color: commonColors.black,
                    lineHeight: moderateScale(24),
                    textAlign: 'left',
                },
                quoteContainer: {
                    backgroundColor: colors.background,
                    borderRadius: moderateScale(8),
                    padding: moderateScale(20),
                    marginVertical: moderateScale(24),
                    borderWidth: 0.4,
                    borderColor: commonColors.gray500,
                    shadowColor: colors.shadowColor,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                },
                quoteText: {
                    fontSize: moderateScale(16),
                    fontFamily: fontFamily.regular,
                    color: commonColors.black,
                    fontStyle: 'italic',
                    textAlign: 'center',
                    lineHeight: moderateScale(24),
                },
                divider: {
                    height: 1,
                    backgroundColor: '#E5E3DE',
                    marginTop: moderateScale(40),
                    width: '100%',
                },
            }),
        [isRTL]
    );
};

export default useRTLStyles;
