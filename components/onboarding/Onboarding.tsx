import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OnboardingScreen from "./OnboardingScreen";

const { width } = Dimensions.get("window");

const ONBOARDING_DATA = [
  {
    id: 1,
    title: "Bienvenue sur MovieApp",
    subtitle: "Votre univers cinématographique",
    description:
      "Découvrez des milliers de films, créez votre liste personnelle et explorez l'univers du cinéma comme jamais auparavant.",
    image: icons.logo,
    backgroundColor: "#030014",
  },
  {
    id: 2,
    title: "Recherche Intelligente",
    subtitle: "Trouvez vos films préférés",
    description:
      "Utilisez notre moteur de recherche avancé pour découvrir des films par titre, genre ou acteur. Obtenez des recommandations personnalisées.",
    image: icons.search,
    backgroundColor: "#0f0d23",
  },
  {
    id: 3,
    title: "Films Tendances",
    subtitle: "Restez à la pointe",
    description:
      "Découvrez les films les plus populaires et les dernières sorties. Notre algorithme vous suggère le meilleur du cinéma actuel.",
    image: icons.star,
    backgroundColor: "#151312",
  },
  {
    id: 4,
    title: "Votre Profil Personnel",
    subtitle: "Sauvegardez et organisez",
    description:
      "Créez votre collection personnelle de films, notez-les et partagez vos découvertes avec la communauté cinéphile.",
    image: icons.person,
    backgroundColor: "#221f3d",
  },
];

interface OnboardingProps {
  onComplete?: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  // Synchroniser le ScrollView avec currentIndex
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: currentIndex * width,
        animated: true,
      });
    }
  }, [currentIndex]);

  const goToNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const completeOnboarding = () => {
    // Naviguer directement vers les tabs (page d'accueil)
    router.replace("/(tabs)");
  };

  const skipOnboarding = () => {
    completeOnboarding();
  };

  const renderDots = () => {
    return (
      <View className="flex-row justify-center items-center mb-6">
        {ONBOARDING_DATA.map((_, index) => (
          <View
            key={index}
            className={`w-3 h-3 rounded-full mx-2 ${
              index === currentIndex ? "bg-accent" : "bg-light-300"
            }`}
          />
        ))}
      </View>
    );
  };

  const renderButtons = () => {
    if (currentIndex === ONBOARDING_DATA.length - 1) {
      return (
        <View className="absolute bottom-16 left-0 right-0 items-center px-8">
          {/* Bouton Commencer - plus proéminent */}
          <TouchableOpacity
            onPress={completeOnboarding}
            className="bg-accent py-4 px-12 rounded-full items-center"
            activeOpacity={0.8}
          >
            <Text className="text-white text-lg font-bold">
              Commencer l'aventure
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View className="absolute bottom-16 left-0 right-0 items-center px-8">
        {/* Bouton Suivant - plus proéminent */}
        <TouchableOpacity
          onPress={goToNext}
          className="bg-accent py-4 px-12 rounded-full items-center"
          activeOpacity={0.8}
        >
          <Text className="text-white text-lg font-bold">Continuer</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1">
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
        >
          {ONBOARDING_DATA.map((screen, index) => (
            <View key={index} style={{ width, flex: 1 }}>
              <OnboardingScreen
                {...screen}
                onSkip={skipOnboarding}
                showSkip={true}
              />
            </View>
          ))}
        </ScrollView>

        {/* Progress Dots */}
        <View className="absolute bottom-40 left-0 right-0 items-center">
          {renderDots()}
        </View>

        {/* Navigation Buttons */}
        {renderButtons()}
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
