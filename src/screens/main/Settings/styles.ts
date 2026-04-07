import { StyleSheet } from 'react-native';
import fontFamily from '@/styles/fontFamily';
import { moderateScale } from '@/styles/scaling';
import { commonColors } from '@/styles/colors';

const useRTLStyles = (isRTL: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#F3F2EF',
        },
        listContainer: {
            paddingHorizontal: moderateScale(6),
            marginTop: moderateScale(18),
            gap: moderateScale(12),
        },
        itemCard: {
            minHeight: moderateScale(62),
            borderRadius: moderateScale(14),
            backgroundColor: '#FFFFFF',
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            paddingHorizontal: moderateScale(14),
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 2,
            marginHorizontal: moderateScale(5),
        },
        iconWrap: {
            width: moderateScale(30),
            height: moderateScale(30),
            borderRadius: moderateScale(8),
            backgroundColor: '#F8F8F8',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: isRTL ? 0 : moderateScale(12),
            marginLeft: isRTL ? moderateScale(12) : 0,
        },
        itemText: {
            color: commonColors.black,
            fontSize: moderateScale(15),
            lineHeight: moderateScale(18),
            fontFamily: fontFamily.times,
            fontWeight: '700',
        },
        textContainer: {
            flex: 1,

        },
        logoutButtonContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            // paddingBottom: moderateScale(10),
            marginBottom: moderateScale(10),
        },
    });
};

export default useRTLStyles;