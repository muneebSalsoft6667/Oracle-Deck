import { ProfileImage } from '@/assets/images';
import ActionModalComp from '@/components/ActionModalComp';
import ButtonComp from '@/components/ButtonComp';
import HeaderComp from '@/components/HeaderComp';
import ImageComp from '@/components/ImageComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import useIsRTL from '@/hooks/useIsRTL';
import { User } from '@/models/User';
import { MainStackParamList } from '@/navigation/types';
import { useDispatch, useSelector } from '@/redux/hooks';
import { saveUserData } from '@/redux/reducers/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import useRTLStyles from './styles';

const tickAnimation = require('../../../assets/images/tick.json');

const EditProfile = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    const dispatch = useDispatch();
    const isRTL = useIsRTL();
    const styles = useRTLStyles(isRTL);
    const userData = useSelector(state => state.auth.userData);

    const fallbackDisplayName = `${userData.firstName} ${userData.lastName}`.trim() || userData.username || 'Selene Seeker';
    const [displayName, setDisplayName] = useState(fallbackDisplayName);
    const [avatarUri, setAvatarUri] = useState(userData.image || '');
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

    const profileSource = useMemo(
        () => (avatarUri ? { uri: avatarUri } : ProfileImage),
        [avatarUri],
    );

    const onPickImage = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.9,
            selectionLimit: 1,
        });

        if (result.didCancel) {
            return;
        }
        const selectedUri = result.assets?.[0]?.uri;
        if (selectedUri) {
            setAvatarUri(selectedUri);
        }
    };

    const onSave = () => {
        const normalizedName = displayName.trim();
        const [firstName = '', ...rest] = normalizedName.split(' ');
        const updatedUser: User = {
            ...userData,
            firstName: firstName || userData.firstName,
            lastName: rest.join(' ') || userData.lastName,
            username: normalizedName || userData.username,
            image: avatarUri || userData.image,
        };
        dispatch(saveUserData(updatedUser));
        setSuccessModalVisible(true);
    };

    const onCloseModal = () => {
        setSuccessModalVisible(false);
    };

    const onBackToProfile = () => {
        setSuccessModalVisible(false);
        navigation.goBack();
    };

    return (
        <WrapperContainer style={styles.container}>
            <HeaderComp showBack={true} title="Edit Profile" />
            <View style={styles.content}>
                <Pressable onPress={onPickImage} style={styles.avatarPressable}>
                    <ImageComp source={profileSource} width={100} height={100} circular style={styles.avatar} />
                    <View style={styles.cameraBadge}>
                        <View style={styles.plusVertical} />
                        <View style={styles.plusHorizontal} />
                    </View>
                </Pressable>
                <TextComp isDynamic text="Change Avatar" style={styles.changeAvatarText} />

                <View style={styles.formSection}>
                    <TextComp isDynamic text="Display Name" style={styles.label} />
                    <TextInput
                        value={displayName}
                        onChangeText={setDisplayName}
                        placeholder="Selene Seeker"
                        placeholderTextColor="#A39E95"
                        style={styles.displayInput}
                    />

                    <TextComp isDynamic text="Email Address" style={styles.label} />
                    <TextInput
                        value={userData.email || 'Selena.seeker98@gmail.com'}
                        editable={false}
                        selectTextOnFocus={false}
                        style={styles.emailInput}
                    />
                    <TextComp isDynamic text="Email cannot be changed for security reasons." style={styles.warningText} />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <ButtonComp
                    title="SAVE CHANGES"
                    onPress={onSave}
                    height={52}
                />
            </View>
            <ActionModalComp
                isVisible={isSuccessModalVisible}
                onClose={onCloseModal}
                title="Welcome to Inner Circle"
                description="Your profile has been successfully updated and synced with the sanctuary."
                buttonText="BACK TO PROFILE"
                onButtonPress={onBackToProfile}
                lottieSource={tickAnimation}
            />
        </WrapperContainer>
    );
};

export default EditProfile;