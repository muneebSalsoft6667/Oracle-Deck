import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Onboarding: undefined;
  Personalize: undefined;
  ForgotPassword: undefined;
  ForgotOTP: {
    email: string;
  };
  ResetPassword: {
    email: string;
    otp: string;
  };
  OTPVerification: {
    phoneNumber: string;
  };
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  History: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  ShuffleandDraw: undefined;
  ShuffleTheDeck: {
    readingTitle?: string;
    cardCount?: number;
  };
  CardPosition: {
    position: string;
    cardImage: number;
    cardTitle: string;
    cardSubtitle: string;
    cardDescription: string;
  };
  FullInterpretation: {
    readingTitle: string;
    cardImage: number;
    cardTitle: string;
    cardDescription: string;
  };
  Guidebook: undefined;
  GuidebookDetail: {
    chapterId: number;
  };
  JournalHistoryDetails: {
    journalId: string;
  };
  EditProfile: undefined;
  Settings: undefined;
  Notification: undefined;
  Subscription: undefined;
  CreateJournal: {
    cardImage?: number;
    cardTitle?: string;
    category?: string;
    title?: string;
    description?: string;
    keywords?: string[];
    coreMessage?: string;
    extendedMeaning?: string;
    dailyAffirmation?: string;
  } | undefined;
};