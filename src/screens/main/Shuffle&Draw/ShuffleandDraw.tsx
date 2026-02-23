import React from 'react';
import { View } from 'react-native';
import useRTLStyles from './styles';
import useIsRTL from '@/hooks/useIsRTL';
import WrapperContainer from '@/components/WrapperContainer';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';

const ShuffleandDraw = () => {
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL);
    return (
        <WrapperContainer style={styles.container}>
            <HeaderComp showBack={false} title="Shuffle and Draw" />
            <View style={styles.content}>
                <TextComp text='SHUFFLE AND DRAW' />
            </View>
        </WrapperContainer>
    );
};

export default ShuffleandDraw;