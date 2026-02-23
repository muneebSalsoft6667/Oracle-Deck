import { HomeIcon, HomeInactiveIcon, SearchIcon, SearchInactiveIcon, HistoryIcon, HistoryInactiveIcon, ProfileIcon, ProfileInactiveIcon } from '@/assets/icons';
import { Guidebook, Home, Profile, ShuffleandDraw } from '@/screens';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { moderateScale } from '@/styles/scaling';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import History from '@/screens/main/History/History';
import Search from '@/screens/main/Search/Search';
import MyTabBar from './MyTabBar';
import { MainStackParamList, MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<MainStackParamList>();

const MainTabs = () => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarShowLabel: true,
    tabBarLabelStyle: {
      fontSize: moderateScale(12),
      fontFamily: fontFamily.medium,
      color: colors.text,
    },
    tabBarStyle: {
      borderTopWidth: 1,
    },
  };

  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      id={undefined}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            focused ? <HomeIcon color={color} /> : <HomeInactiveIcon color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, focused }) => (
            focused ? <SearchIcon color={color} /> : <SearchInactiveIcon color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ color, focused }) => (
            focused ? <HistoryIcon color={color} /> : <HistoryInactiveIcon color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            focused ? <ProfileIcon color={color} /> : <ProfileInactiveIcon color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} id={undefined}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="ShuffleandDraw" component={ShuffleandDraw} />
      <Stack.Screen name="Guidebook" component={Guidebook} />
    </Stack.Navigator>
  );
};