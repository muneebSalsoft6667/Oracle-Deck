import { Colors, commonColors, ThemeType } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { moderateScale } from '@/styles/scaling';
import { StyleSheet } from 'react-native';
import { useMemo } from 'react';

const useRTLStyles = (isRTL: boolean, theme?: ThemeType) => {
    const colors = Colors[theme];

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
                formSection: {
                    marginBottom: moderateScale(32),
                },
                inputGroup: {
                    marginBottom: moderateScale(20),
                },
                inputLabel: {
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.medium,
                    color: commonColors.black,
                    marginBottom: moderateScale(8),
                },
                errorText: {
                    fontSize: moderateScale(12),
                    fontFamily: fontFamily.regular,
                    color: commonColors.error,
                    marginTop: moderateScale(4),
                },
                buttonSection: {
                    marginBottom: moderateScale(24),
                },
                createButton: {
                    backgroundColor: '#4E3F86',
                    borderRadius: moderateScale(12),
                    height: moderateScale(52),
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 4,
                },
                createButtonText: {
                    color: commonColors.white,
                    fontSize: moderateScale(16),
                    fontFamily: fontFamily.semiBold,
                    textTransform: 'uppercase',
                },
                signInContainer: {
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                signInText: {
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.regular,
                    color: commonColors.black,
                },
                signInLink: {
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.regular,
                    color: '#4E3F86',
                    textDecorationLine: 'underline',
                },
            }),
        [isRTL, theme, colors]
    );
};

export default useRTLStyles;
