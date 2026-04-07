import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Colors, commonColors, ThemeType } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { moderateScale } from '@/styles/scaling';

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
    const colors = Colors[theme ?? 'light'];

    return useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flex: 1,
                    backgroundColor: '#F3F2EF',
                },
                keyboardView: {
                    flex: 1,
                },
                scrollContent: {
                    flexGrow: 1,
                },
                content: {
                    flex: 1,
                    paddingHorizontal: moderateScale(24),
                    paddingTop: moderateScale(40),
                    paddingBottom: moderateScale(30),
                },
                titleSection: {
                    marginBottom: moderateScale(40),
                    alignItems: 'flex-start',
                },
                title: {
                    fontSize: moderateScale(32),
                    fontFamily: fontFamily.times,
                    color: commonColors.black,
                    marginBottom: moderateScale(8),
                    textAlign: 'left',
                },
                subtitle: {
                    fontSize: moderateScale(16),
                    fontFamily: fontFamily.regular,
                    color: commonColors.black,
                    textAlign: 'left',
                },
                otpSection: {
                    marginBottom: moderateScale(32),
                },
                otpContainer: {
                    width: '100%',
                },
                otpField: {
                    width: moderateScale(48),
                    height: moderateScale(56),
                    borderRadius: moderateScale(8),
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                },
                otpText: {
                    fontSize: moderateScale(20),
                    fontFamily: fontFamily.semiBold,
                    color: commonColors.black,
                },
                errorText: {
                    fontSize: moderateScale(12),
                    fontFamily: fontFamily.regular,
                    color: commonColors.error,
                    marginTop: moderateScale(12),
                    textAlign: 'center',
                },
                buttonSection: {
                    marginBottom: moderateScale(24),
                },
                resendText: {
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.medium,
                    color: '#4E3F86',
                    textAlign: 'center',
                    marginBottom: moderateScale(16),
                    textDecorationLine: 'underline',
                },
                verifyButton: {
                    backgroundColor: '#4E3F86',
                    borderRadius: moderateScale(12),
                    height: moderateScale(52),
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 4,
                },
                verifyButtonText: {
                    color: commonColors.white,
                    fontSize: moderateScale(16),
                    fontFamily: fontFamily.semiBold,
                    textTransform: 'uppercase',
                },
            }),
        [isRTL, theme, colors]
    );
};

export default useRTLStyles;
