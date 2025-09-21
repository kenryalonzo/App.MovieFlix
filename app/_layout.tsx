import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Onboarding from "@/components/onboarding/Onboarding";

export default function RootLayout() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Pour l'instant, on affiche toujours l'onboarding
    // Plus tard, on pourra vérifier le statut dans AsyncStorage
    const checkOnboardingStatus = async () => {
      try {
        // Simulation d'une vérification
        // const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
        // setShowOnboarding(onboardingCompleted !== 'true');

        // Pour le moment, on affiche l'onboarding à chaque lancement
        setShowOnboarding(true);
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        setShowOnboarding(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <StatusBar hidden={true} />
      </View>
    );
  }

  if (showOnboarding) {
    return <Onboarding />;
  }

  return (
    <>
      <StatusBar hidden={true} />

      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="onboarding"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
