import { HistoryIcon, HistoryInactiveIcon, HomeIcon, HomeInactiveIcon, ProfileIcon, ProfileInactiveIcon, SearchIcon, SearchInactiveIcon } from '@/assets/icons';
import { useTheme } from '@/context/ThemeContext';
import { CreateJournal, EditProfile, Guidebook, GuidebookDetail, Home, Notification, Profile, Settings, ShuffleandDraw, ShuffleTheDeck, Subscription } from '@/screens';
import History from '@/screens/main/History/History';
import JournalHistoryDetails from '@/screens/main/History/JournalHistoryDetails';
import Search from '@/screens/main/Search/Search';
import CardPosition from '@/screens/main/ShuffleTheDeck/CardPosition';
import FullInterpretation from '@/screens/main/ShuffleTheDeck/FullInterpretation';
import { Colors } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { moderateScale } from '@/styles/scaling';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
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
      <Stack.Screen 
        name="ShuffleandDraw" 
        component={ShuffleandDraw}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="ShuffleTheDeck" 
        component={ShuffleTheDeck}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="CardPosition" 
        component={CardPosition}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="FullInterpretation" 
        component={FullInterpretation}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="Guidebook" 
        component={Guidebook}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="GuidebookDetail" 
        component={GuidebookDetail}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="JournalHistoryDetails" 
        component={JournalHistoryDetails}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Subscription" component={Subscription} />
      <Stack.Screen 
        name="CreateJournal" 
        component={CreateJournal}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};