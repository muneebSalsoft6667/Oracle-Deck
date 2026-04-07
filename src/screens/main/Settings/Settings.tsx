import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import useRTLStyles from './styles';
import useIsRTL from '@/hooks/useIsRTL';
import WrapperContainer from '@/components/WrapperContainer';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import ButtonComp from '@/components/ButtonComp';
import LogoutModal from '@/components/LogoutModal';
import { ArrowRightIcon, BellIcon, CardIcon, ProfileIcon } from '@/assets/icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '@/navigation/types';
import { clearDataAction } from '@/redux/actions/auth';

const Settings = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

    const handleLogoutClick = () => {
        setIsLogoutModalVisible(true);
    };

    const handleLogoutConfirm = () => {
        setIsLogoutModalVisible(false);
        setTimeout(() => {
            clearDataAction();
        }, 200);
    };

    const handleLogoutCancel = () => {
        setIsLogoutModalVisible(false);
    };

    return (
        <WrapperContainer style={styles.container}>
            <HeaderComp showBack={true} title="SETTINGS" />

            <View style={styles.listContainer}>
                <Pressable
                    style={styles.itemCard}
                    onPress={() => navigation.navigate('MainTabs', { screen: 'Profile' })}
                    android_ripple={{ color: 'rgba(0,0,0,0.06)', borderless: false }}
                >
                    <View style={styles.iconWrap}>
                        <ProfileIcon width={16} height={16} />
                    </View>
                    <View style={styles.textContainer}>
                        <TextComp isDynamic text="Profile Management" style={styles.itemText} />
                    </View>
                    <ArrowRightIcon width={18} height={18} />
                </Pressable>

                <Pressable
                    style={styles.itemCard}
                    onPress={() => navigation.navigate('Notification')}
                    android_ripple={{ color: 'rgba(0,0,0,0.06)', borderless: false }}
                >
                    <View style={styles.iconWrap}>
                        <BellIcon width={16} height={16} />
                    </View>
                    <View style={styles.textContainer}>
                        <TextComp isDynamic text="Notification Settings" style={styles.itemText} />
                    </View>
                    <ArrowRightIcon width={18} height={18} />
                </Pressable>

                <Pressable
                    style={styles.itemCard}
                    onPress={() => navigation.navigate('Subscription')}
                    android_ripple={{ color: 'rgba(0,0,0,0.06)', borderless: false }}
                >
                    <View style={styles.iconWrap}>
                        <CardIcon width={16} height={16} />
                    </View>
                    <View style={styles.textContainer}>
                        <TextComp isDynamic text="Subscription Status" style={styles.itemText} />
                    </View>
                    <ArrowRightIcon width={18} height={18} />
                </Pressable>
            </View>

            <View style={styles.logoutButtonContainer}>
                <ButtonComp title="LOGOUT ACCOUNT" onPress={handleLogoutClick}  />
            </View>

            {/* Logout Confirmation Modal */}
            <LogoutModal
                isVisible={isLogoutModalVisible}
                onClose={handleLogoutCancel}
                onConfirm={handleLogoutConfirm}
            />
        </WrapperContainer>
    );
};

export default Settings;
