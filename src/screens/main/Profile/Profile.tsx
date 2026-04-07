import ButtonComp from '@/components/ButtonComp';
import ImageComp from '@/components/ImageComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import { ProfileImage } from '@/assets/images';
import UserIcon from '@/assets/images/profile.svg';
import useIsRTL from '@/hooks/useIsRTL';
import { MainStackParamList } from '@/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from '@/redux/hooks';
import React from 'react';
import { View } from 'react-native';
import useRTLStyles from './styles';
import HeaderComp from '@/components/HeaderComp';
import { EmailIcon } from '@/assets/icons';

const Profile = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL);
    const userData = useSelector(state => state.auth.userData);
    const displayName = `${userData.firstName} ${userData.lastName}`.trim() || userData.username || 'Selene Seeker';
    const email = userData.email || 'selene@oracle.app';
    const profileSource = userData.image ? { uri: userData.image } : ProfileImage;

    return (
        <WrapperContainer style={styles.container}>
            <HeaderComp showBack={true} title="Profile" />
            <View style={styles.content}>
                <ImageComp source={profileSource} width={100} height={100} circular style={styles.avatar} />
                <TextComp isDynamic text={displayName} style={styles.nameText} />
                <TextComp isDynamic text={email} style={styles.emailText} />

                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <View style={styles.iconWrap}>
                            <UserIcon width={14} height={14}  />
                        </View>
                        <View style={styles.infoTextWrap}>
                            <TextComp isDynamic text="DISPLAY NAME" style={styles.infoLabel} />
                            <TextComp isDynamic text={displayName} style={styles.infoValue} />
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.iconWrap}>
                            <EmailIcon width={14} height={14} />
                        </View>
                        <View style={styles.infoTextWrap}>
                            <TextComp isDynamic text="EMAIL ADDRESS" style={styles.infoLabel} />
                            <TextComp isDynamic text={email} style={styles.infoValue} />
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <ButtonComp
                    title="EDIT PROFILE"
                    onPress={() => navigation.navigate('EditProfile')}
                    height={52}
                    textStyle={styles.editButtonText}
                />
            </View>
        </WrapperContainer>
    );
};
export default Profile;
