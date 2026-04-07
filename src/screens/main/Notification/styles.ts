import { StyleSheet } from 'react-native';
import { moderateScale } from '@/styles/scaling';
import fontFamily from '@/styles/fontFamily';

const useRTLStyles = (_isRTL: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#F3F2EF',
        },
        content: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: moderateScale(20),
        },
        helperText: {
            fontSize: moderateScale(14),
            color: '#5A5852',
            fontFamily: fontFamily.medium,
            textAlign: 'center',
        },
    });
};

export default useRTLStyles;
