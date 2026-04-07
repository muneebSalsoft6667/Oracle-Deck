import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { moderateScale } from '@/styles/scaling';
import fontFamily from '@/styles/fontFamily';
import { commonColors } from '@/styles/colors';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/styles/colors';

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
                headerContainer: {
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: moderateScale(16),
                    paddingVertical: moderateScale(12),
                    backgroundColor: commonColors.white,
                    borderBottomWidth: 0.3,
                    borderBottomColor: commonColors.gray300,
                },
                backButton: {
                    width: moderateScale(40),
                    height: moderateScale(40),
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                deleteButton: {
                    width: moderateScale(40),
                    height: moderateScale(40),
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                iconButton: {
                    width: moderateScale(40),
                    height: moderateScale(40),
                    borderRadius: moderateScale(20),
                    backgroundColor: commonColors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: commonColors.gray500,
                    shadowOffset: {
                        width: 2,
                        height: 2,
                    },
                    shadowOpacity: 0.45,
                    shadowRadius: 4.84,
                    elevation: 10,
                },
                dateContainer: {
                    flex: 1,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    marginLeft:10
                },
                dateText: {
                    fontSize: moderateScale(16),
                    fontFamily: fontFamily.regular,
                    color: commonColors.black,
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
                titleSection: {
                    marginBottom: moderateScale(32),
                },
                title: {
                    fontSize: moderateScale(28),
                    fontFamily: fontFamily.times,
                    color: commonColors.black,
                    textAlign: 'left',
                },
                subtitle: {
                    fontSize: moderateScale(12),
                    fontFamily: fontFamily.regular,
                    color: commonColors.black,
                    textAlign: 'left',
                    opacity: 0.7,
                },
                singleCardContainer: {
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                    gap: moderateScale(20),
                },
                multipleCardsContainer: {
                    gap: moderateScale(24),
                },
                cardRow: {
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                    gap: moderateScale(16),
                },
                cardImageContainer: {
                    borderRadius: moderateScale(16),
                    overflow: 'hidden',
                },
                cardDescriptionContainer: {
                    flex: 1,
                    justifyContent: 'flex-start',
                },
                cardLabel: {
                    fontSize: moderateScale(11),
                    fontFamily: fontFamily.regular,
                    color: '#9E9E9E',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    marginBottom: moderateScale(4),
                },
                cardTitle: {
                    fontSize: moderateScale(20),
                    fontFamily: fontFamily.times,
                    color: commonColors.black,
                    marginBottom: moderateScale(8),
                },
                cardQuote: {
                    fontSize: moderateScale(12),
                    fontFamily: fontFamily.regular,
                    color: commonColors.black,
                    fontStyle: 'italic',
                    lineHeight: moderateScale(22),
                },
                modal: {
                    margin: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                modalContainer: {
                    backgroundColor: commonColors.white,
                    borderRadius: moderateScale(24),
                    padding: moderateScale(24),
                    paddingTop: moderateScale(32),
                    width: '85%',
                    maxWidth: moderateScale(400),
                    alignItems: 'center',
                    shadowColor: commonColors.black,
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 8,
                    elevation: 10,
                },
                modalIconContainer: {
                    marginBottom: moderateScale(20),
                },
                modalIconCircle: {
                    width: moderateScale(64),
                    height: moderateScale(64),
                    borderRadius: moderateScale(32),
                    backgroundColor: '#FFE5E5',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                modalTitle: {
                    fontSize: moderateScale(20),
                    fontFamily: fontFamily.bold,
                    color: commonColors.black,
                    marginBottom: moderateScale(12),
                    textAlign: 'center',
                },
                modalDescription: {
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.regular,
                    color: commonColors.black,
                    textAlign: 'center',
                    marginBottom: moderateScale(24),
                    lineHeight: moderateScale(20),
                },
                deleteButtonModal: {
                    width: '100%',
                    backgroundColor: '#6B46C1',
                    borderRadius: moderateScale(22),
                    paddingVertical: moderateScale(10),
                    paddingHorizontal: moderateScale(24),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: moderateScale(16),
                },
                deleteButtonText: {
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.bold,
                    color: commonColors.white,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                },
                keepItButton: {
                    paddingVertical: moderateScale(8),
                    paddingHorizontal: moderateScale(16),
                },
                keepItText: {
                    fontSize: moderateScale(12),
                    fontFamily: fontFamily.medium,
                    color: commonColors.black,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                },
            }),
        [isRTL, theme]
    );
};

export default useRTLStyles;
