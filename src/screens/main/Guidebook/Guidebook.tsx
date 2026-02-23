import React from 'react';
import { View } from 'react-native';
import useRTLStyles from './styles';
import useIsRTL from '@/hooks/useIsRTL';
import WrapperContainer from '@/components/WrapperContainer';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';

const Guidebook = () => {
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL);
    return (
        <WrapperContainer style={styles.container}>
            <HeaderComp showBack={false} title="Guidebook" />
            <View style={styles.content}>
                <TextComp text='GUIDEBOOK' />
            </View>
        </WrapperContainer>
    );
};

export default Guidebook;