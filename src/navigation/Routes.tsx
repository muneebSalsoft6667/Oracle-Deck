import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import AuthStack from './AuthStack';
import { MainStack } from './MainStack';
import { OnBoard } from '@/screens';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { secureStorage } from '@/utils/secureStorage';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Routes = () => {
    const { isFirstTime } = useSelector((state: RootState) => state.auth);
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);
    const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);
    const previousIsFirstTime = useRef<boolean | null>(null);

    useEffect(() => {
        const checkOnboarding = async () => {
            const seen = await secureStorage.getItem('HAS_SEEN_ONBOARDING');
            setHasSeenOnboarding(seen === 'true');
        };
        checkOnboarding();
    }, []);

    // Handle navigation when isFirstTime changes
    useEffect(() => {
        // Skip if onboarding hasn't been checked yet
        if (hasSeenOnboarding === null) {
            return;
        }

        // Wait for navigation to be ready
        if (!navigationRef.current?.isReady()) {
            // Set up a small delay to wait for navigation to be ready
            const timer = setTimeout(() => {
                if (navigationRef.current?.isReady() && previousIsFirstTime.current !== null && previousIsFirstTime.current !== isFirstTime) {
                    previousIsFirstTime.current = isFirstTime;
                    if (isFirstTime) {
                        navigationRef.current?.reset({
                            index: 0,
                            routes: [{ name: 'Main' }],
                        });
                    } else {
                        navigationRef.current?.reset({
                            index: 0,
                            routes: [{ name: 'Auth' }],
                        });
                    }
                }
            }, 100);
            return () => clearTimeout(timer);
        }

        // Skip if this is the initial render
        if (previousIsFirstTime.current === null) {
            previousIsFirstTime.current = isFirstTime;
            return;
        }

        // Only navigate if the value actually changed
        if (previousIsFirstTime.current !== isFirstTime) {
            previousIsFirstTime.current = isFirstTime;
            
            // Navigate to the appropriate stack
            if (isFirstTime) {
                navigationRef.current?.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                });
            } else {
                navigationRef.current?.reset({
                    index: 0,
                    routes: [{ name: 'Auth' }],
                });
            }
        }
    }, [isFirstTime, hasSeenOnboarding]);

    // Show nothing until we check onboarding status
    if (hasSeenOnboarding === null) {
        return null;
    }

    // Determine initial route
    const getInitialRoute = (): keyof RootStackParamList => {
        if (!hasSeenOnboarding) {
            return 'Onboarding';
        }
        return isFirstTime ? 'Main' : 'Auth';
    };

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                previousIsFirstTime.current = isFirstTime;
            }}
        >
            <Stack.Navigator 
                screenOptions={{ headerShown: false }} 
                initialRouteName={getInitialRoute()}
                id={undefined}
            >
                <Stack.Screen name="Onboarding" component={OnBoard} />
                <Stack.Screen name="Auth" component={AuthStack} />
                <Stack.Screen name="Main" component={MainStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
