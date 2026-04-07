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
                titleSection: {
                    marginBottom: moderateScale(32),
                },
                title: {
                    fontSize: moderateScale(28),
                    fontFamily: fontFamily.times,
                    color: commonColors.black,
                    textAlign: 'left',
                    marginBottom: moderateScale(8),
                },
                subtitle: {
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.regular,
                    color: '#666666',
                    textAlign: 'left',
                },
                cardInterpretationContainer: {
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                    marginBottom: moderateScale(40),
                    gap: moderateScale(20),
                },
                cardContainer: {
                    borderRadius: moderateScale(16),
                    overflow: 'hidden',
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 4,
                },
                interpretationContainer: {
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
                    fontSize: moderateScale(24),
                    fontFamily: fontFamily.times,
                    color: commonColors.black,
                    marginBottom: moderateScale(12),
                },
                interpretationText: {
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.regular,
                    color: commonColors.black,
                    lineHeight: moderateScale(22),
                },
                saveButton: {
                    backgroundColor: '#6B46C1',
                    borderRadius: moderateScale(12),
                    marginTop: moderateScale(0),
                    alignSelf: 'stretch',
                },
                saveButtonText: {
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.bold,
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
                    backgroundColor: '#14B8A6',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#14B8A6',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 5,
                },
                lottieIcon: {
                    width: moderateScale(60),
                    height: moderateScale(60),
                },
                modalTitle: {
                    fontSize: moderateScale(24),
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
                modalButton: {
                    backgroundColor: '#6B46C1',
                    borderRadius: moderateScale(12),
                    marginTop: moderateScale(0),
                    alignSelf: 'stretch',
                },
                modalButtonText: {
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.bold,
                },
            }),
        [isRTL]
    );
};

export default useRTLStyles;
