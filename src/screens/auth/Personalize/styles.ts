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
                    paddingTop: moderateScale(20),
                    paddingBottom: moderateScale(30),
                },
                backButton: {
                    marginBottom: moderateScale(24),
                },
                backIconContainer: {
                    width: moderateScale(40),
                    height: moderateScale(40),
                    borderRadius: moderateScale(20),
                    backgroundColor: commonColors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 2,
                },
                backArrow: {
                    width: moderateScale(12),
                    height: moderateScale(12),
                    borderLeftWidth: moderateScale(2),
                    borderBottomWidth: moderateScale(2),
                    borderColor: commonColors.black,
                    transform: [{ rotate: '45deg' }],
                },
                titleSection: {
                    marginBottom: moderateScale(40),
                },
                title: {
                    fontSize: moderateScale(32),
                    fontFamily: fontFamily.times,
                    color: commonColors.black,
                    marginBottom: moderateScale(8),
                },
                subtitle: {
                    fontSize: moderateScale(16),
                    fontFamily: fontFamily.regular,
                    color: commonColors.black,
                },
                avatarSection: {
                    alignItems: 'center',
                    marginBottom: moderateScale(32),
                },
                avatarPressable: {
                    position: 'relative',
                    marginBottom: moderateScale(12),
                },
                avatar: {
                    borderWidth: 2,
                    borderColor: commonColors.white,
                },
                avatarPlaceholder: {
                    width: moderateScale(120),
                    height: moderateScale(120),
                    borderRadius: moderateScale(60),
                    backgroundColor: '#E8E8E8',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: commonColors.white,
                },
                plusBadge: {
                    position: 'absolute',
                    bottom: moderateScale(0),
                    right: isRTL ? undefined : moderateScale(-2),
                    left: isRTL ? moderateScale(-2) : undefined,
                    width: moderateScale(36),
                    height: moderateScale(36),
                    borderRadius: moderateScale(18),
                    backgroundColor: '#4E3F86',
                    borderWidth: 3,
                    borderColor: commonColors.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                plusVertical: {
                    position: 'absolute',
                    width: moderateScale(2.5),
                    height: moderateScale(14),
                    borderRadius: moderateScale(2),
                    backgroundColor: commonColors.white,
                },
                plusHorizontal: {
                    width: moderateScale(14),
                    height: moderateScale(2.5),
                    borderRadius: moderateScale(2),
                    backgroundColor: commonColors.white,
                },
                chooseAvatarText: {
                    fontSize: moderateScale(12),
                    fontFamily: fontFamily.medium,
                    color: commonColors.black,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                },
                inputSection: {
                    marginBottom: moderateScale(32),
                },
                inputLabel: {
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.medium,
                    color: commonColors.black,
                    marginBottom: moderateScale(8),
                },
                spiritualNameInput: {
                    backgroundColor: commonColors.white,
                    borderWidth: 2,
                    borderColor: '#E0E0E0',
                    borderRadius: moderateScale(22),
                    padding: moderateScale(14),
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.regular,
                    color: commonColors.black,
                },
                focusSection: {
                    marginBottom: moderateScale(40),
                },
                focusGrid: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: moderateScale(12),
                },
                focusButton: {
                    flex: 1,
                    minWidth: '45%',
                    backgroundColor: commonColors.white,
                    borderWidth: 2,
                    borderColor: '#E0E0E0',
                    borderRadius: moderateScale(20),
                    // padding: moderateScale(16),
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: moderateScale(40),
                },
                focusButtonSelected: {
                    borderWidth: 1,
                    borderColor: commonColors.gray500,
                    // backgroundColor: '#F0FDFF',
                },
                focusButtonText: {
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.medium,
                    color: '#8B8B8B',
                },
                focusButtonTextSelected: {
                    color: commonColors.black,
                    fontFamily: fontFamily.semiBold,
                },
                buttonSection: {
                    marginTop: 'auto',
                },
                enterButton: {
                    backgroundColor: '#4E3F86',
                    borderRadius: moderateScale(12),
                    height: moderateScale(52),
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 4,
                },
                enterButtonText: {
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
