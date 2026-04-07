import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { moderateScale } from '@/styles/scaling';
import fontFamily from '@/styles/fontFamily';
import { commonColors } from '@/styles/colors';

const useRTLStyles = (_isRTL: boolean) => {
    return useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flex: 1,
                    backgroundColor: '#F9F7F2', // Light cream/off-white background
                },
                scrollView: {
                    flex: 1,
                },
                scrollContent: {
                    paddingBottom: moderateScale(40),
                },
                content: {
                    flex: 1,
                    paddingHorizontal: moderateScale(16),
                    paddingTop: moderateScale(16),
                },
                // Card Image Section
                cardImageContainer: {
                    marginBottom: moderateScale(20),
                    alignItems: 'center',
                },
                cardWrapper: {
                    width: '100%',
                    borderRadius: moderateScale(20),
                    overflow: 'hidden',
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.2,
                    shadowRadius: 12,
                    elevation: 8,
                    backgroundColor: '#FFFFFF',
                },
                cardTitleOverlay: {
                    position: 'absolute',
                    top: moderateScale(20),
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                    zIndex: 1,
                },
                cardTitleText: {
                    fontSize: moderateScale(22),
                    fontFamily: fontFamily.times,
                    color: '#2C2C2C',
                    fontWeight: '600',
                    letterSpacing: 1.2,
                },
                bannerContainer: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(249, 247, 242, 0.98)', // Light beige with slight transparency
                    paddingVertical: moderateScale(14),
                    paddingHorizontal: moderateScale(16),
                    alignItems: 'center',
                },
                bannerText: {
                    fontSize: moderateScale(13),
                    fontFamily: fontFamily.medium,
                    color: '#2C2C2C',
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                },
                // Text Block
                textBlock: {
                    backgroundColor: '#FFFFFF',
                    borderRadius: moderateScale(16),
                    padding: moderateScale(20),
                    marginBottom: moderateScale(12),
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4,
                    elevation: 2,
                },
                categoryLabel: {
                    fontSize: moderateScale(11),
                    fontFamily: fontFamily.regular,
                    color: '#9E9E9E',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    marginBottom: moderateScale(8),
                },
                titleText: {
                    fontSize: moderateScale(24),
                    fontFamily: fontFamily.times,
                    color: '#2C2C2C',
                    marginBottom: moderateScale(12),
                    lineHeight: moderateScale(30),
                },
                descriptionText: {
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.regular,
                    color: '#454545',
                    lineHeight: moderateScale(20),
                },
                // Keywords Section
                keywordsSection: {
                    backgroundColor: '#FFFFFF',
                    borderRadius: moderateScale(16),
                    padding: moderateScale(20),
                    marginBottom: moderateScale(12),
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4,
                    elevation: 2,
                },
                keywordsContainer: {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: moderateScale(16),
                    marginBottom: moderateScale(20),
                    gap: moderateScale(16),
                },
                keywordItem: {
                    paddingHorizontal: moderateScale(8),
                },
                keywordText: {
                    fontSize: moderateScale(12),
                    fontFamily: fontFamily.medium,
                    color: '#454545',
                    letterSpacing: 0.8,
                },
                separatorLine: {
                    height: 1,
                    backgroundColor: '#E0E0E0',
                    marginTop: moderateScale(12),
                },
                // Section Styles
                section: {
                    backgroundColor: '#FFFFFF',
                    borderRadius: moderateScale(16),
                    padding: moderateScale(20),
                    marginBottom: moderateScale(12),
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4,
                    elevation: 2,
                },
                sectionTitle: {
                    fontSize: moderateScale(18),
                    fontFamily: fontFamily.times,
                    color: '#2C2C2C',
                    marginBottom: moderateScale(12),
                    fontWeight: '600',
                },
                sectionContent: {
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.regular,
                    color: '#454545',
                    lineHeight: moderateScale(22),
                },
                affirmationTitle: {
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.medium,
                    color: '#2C2C2C',
                    marginBottom: moderateScale(12),
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                },
                // Personal Notes
                notesInput: {
                    backgroundColor: '#F9F7F2',
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    borderRadius: moderateScale(16),
                    padding: moderateScale(16),
                    minHeight: moderateScale(140),
                    fontSize: moderateScale(14),
                    fontFamily: fontFamily.regular,
                    color: '#2C2C2C',
                    textAlignVertical: 'top',
                },
                // Save Button
                saveButton: {
                    width: '100%',
                    height: moderateScale(52),
                    marginTop: moderateScale(8),
                    marginBottom: moderateScale(24),
                },
                // Modal Styles
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
                    width: '100%',
                    height: moderateScale(52),
                    marginTop: 0,
                },
            }),
        []
    );
};

export default useRTLStyles;
