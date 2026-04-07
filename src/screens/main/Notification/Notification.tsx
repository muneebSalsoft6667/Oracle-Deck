import React from 'react';
import { View } from 'react-native';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import useIsRTL from '@/hooks/useIsRTL';
import useRTLStyles from './styles';

const Notification = () => {
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL);

    return (
        <WrapperContainer style={styles.container}>
            <HeaderComp showBack={true} title="NOTIFICATION SETTINGS" />
            <View style={styles.content}>
                <TextComp isDynamic text="Manage your notification preferences here." style={styles.helperText} />
            </View>
        </WrapperContainer>
    );
};

export default Notification;
