import Onboarding from "@/components/onboarding/Onboarding";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import "./global.css";

export default function RootLayout() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Désactiver l'onboarding pour éviter la boucle infinie
    const checkOnboardingStatus = async () => {
      try {
        // Simulation d'une vérification
        // const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
        // setShowOnboarding(onboardingCompleted !== 'true');

        // Pour le moment, on désactive l'onboarding
        setShowOnboarding(false);
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        setShowOnboarding(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  // Fonction pour terminer l'onboarding
  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <StatusBar hidden={true} />
      </View>
    );
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
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
