import { useTheme } from '@/context/ThemeContext';
import useIsRTL from '@/hooks/useIsRTL';
import { Colors, ThemeType } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
const MyTabBar = ({ state, descriptors, navigation }) => {
    const isRTL = useIsRTL();
    const { theme } = useTheme();
    const styles = useRTLStyles(isRTL, theme);
    const colors = Colors[theme];

    const leftRoutes = state?.routes.slice(0, 2);
    const rightRoutes = state?.routes.slice(2, 4);

    const renderTab = (route, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const iconColor = isFocused ? '#4E3F86' : '#B8B0A9';

        const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
            }
        };

        const onLongPress = () => {
            navigation.emit({ type: 'tabLongPress', target: route.key });
        };

        const icon = options.tabBarIcon
            ? options.tabBarIcon({
                focused: isFocused,
                color: iconColor,
                size: 24,
            })
            : null;

        return (
            <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabButton}
                activeOpacity={0.8}
            >
                {icon}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabsRow}>
                <View style={styles.sideGroup}>
                    {leftRoutes.map((route, index) => renderTab(route, index))}
                </View>

                <View style={styles.centerGap} />

                <View style={styles.sideGroup}>
                    {rightRoutes.map((route, index) => renderTab(route, index + 2))}
                </View>
            </View>

            <TouchableOpacity
                style={styles.centerOuterButton}
                onPress={() => navigation.navigate('CreateJournal')}
                activeOpacity={0.85}
            >
                <View style={styles.centerInnerButton}>
                    <View style={styles.plusVertical} />
                    <View style={styles.plusHorizontal} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const useRTLStyles = (isRTL: boolean, theme: ThemeType) => {
    return useMemo(() => StyleSheet.create({
        container: {
            backgroundColor: '#FFFFFF',
            minHeight: moderateScale(86),
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
        },
        tabsRow: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(24),
        },
        sideGroup: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: moderateScale(122),
        },
        centerGap: {
            width: moderateScale(78),
        },
        tabButton: {
            width: moderateScale(34),
            height: moderateScale(34),
            alignItems: 'center',
            justifyContent: 'center',
        },
        centerOuterButton: {
            position: 'absolute',
            top: moderateScale(-16),
            alignSelf: 'center',
            width: moderateScale(66),
            height: moderateScale(66),
            borderRadius: moderateScale(43),
            backgroundColor: '#DCD8E6',
            alignItems: 'center',
            justifyContent: 'center',
        },
        centerInnerButton: {
            width: moderateScale(56),
            height: moderateScale(56),
            borderRadius: moderateScale(33),
            backgroundColor: '#4E3F86',
            alignItems: 'center',
            justifyContent: 'center',
        },
        plusVertical: {
            position: 'absolute',
            width: moderateScale(4),
            height: moderateScale(24),
            borderRadius: moderateScale(2),
            backgroundColor: '#FFFFFF',
        },
        plusHorizontal: {
            width: moderateScale(24),
            height: moderateScale(4),
            borderRadius: moderateScale(2),
            backgroundColor: '#FFFFFF',
        },
    }), [isRTL, theme]);
};

export default React.memo(MyTabBar);
