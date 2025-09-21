import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
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

const Onboarding: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const router = useRouter();

  const goToNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      translateX.value = withSpring(-(currentIndex + 1) * width, {
        damping: 20,
        stiffness: 90,
      });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      translateX.value = withSpring(-(currentIndex - 1) * width, {
        damping: 20,
        stiffness: 90,
      });
      setCurrentIndex(currentIndex - 1);
    }
  };

  const completeOnboarding = () => {
    router.replace("/(tabs)");
  };

  const skipOnboarding = () => {
    completeOnboarding();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (
          gestureState.dx < -30 &&
          currentIndex < ONBOARDING_DATA.length - 1
        ) {
          runOnJS(goToNext)();
        } else if (gestureState.dx > 30 && currentIndex > 0) {
          runOnJS(goToPrevious)();
        }
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const renderDots = () => {
    return (
      <View className="flex-row justify-center items-center mb-8">
        {ONBOARDING_DATA.map((_, index) => {
          const dotScale = useSharedValue(index === currentIndex ? 1.2 : 1);

          React.useEffect(() => {
            dotScale.value = withSpring(index === currentIndex ? 1.2 : 1, {
              damping: 15,
              stiffness: 100,
            });
          }, [currentIndex]);

          const dotAnimatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: dotScale.value }],
          }));

          return (
            <Animated.View
              key={index}
              style={dotAnimatedStyle}
              className={`w-2 h-2 rounded-full mx-1 ${
                index === currentIndex ? "bg-accent" : "bg-light-300"
              }`}
            />
          );
        })}
      </View>
    );
  };

  const renderButtons = () => {
    const buttonScale = useSharedValue(1);

    const buttonAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: buttonScale.value }],
    }));

    if (currentIndex === ONBOARDING_DATA.length - 1) {
      return (
        <View className="flex-row justify-between items-center px-6">
          <TouchableOpacity
            onPress={skipOnboarding}
            className="px-6 py-3"
            activeOpacity={0.7}
          >
            <Text className="text-light-200 text-base">Ignorer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              buttonScale.value = withSpring(0.95, {}, () => {
                buttonScale.value = withSpring(1);
                runOnJS(completeOnboarding)();
              });
            }}
            className="bg-accent px-8 py-3 rounded-full"
            activeOpacity={0.8}
          >
            <Animated.View style={buttonAnimatedStyle}>
              <Text className="text-white text-base font-semibold">
                Commencer
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View className="flex-row justify-between items-center px-6">
        <TouchableOpacity
          onPress={skipOnboarding}
          className="px-6 py-3"
          activeOpacity={0.7}
        >
          <Text className="text-light-200 text-base">Ignorer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            buttonScale.value = withSpring(0.95, {}, () => {
              buttonScale.value = withSpring(1);
              runOnJS(goToNext)();
            });
          }}
          className="bg-accent px-8 py-3 rounded-full"
          activeOpacity={0.8}
        >
          <Animated.View style={buttonAnimatedStyle}>
            <Text className="text-white text-base font-semibold">Suivant</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1" {...panResponder.panHandlers}>
      <Animated.View
        style={[
          {
            flex: 1,
            width: width * ONBOARDING_DATA.length,
            flexDirection: "row",
          },
          animatedStyle,
        ]}
      >
        {ONBOARDING_DATA.map((screen, index) => (
          <View key={index} style={{ width, flex: 1 }}>
            <OnboardingScreen {...screen} />
          </View>
        ))}
      </Animated.View>

      {/* Progress Dots */}
      {renderDots()}

      {/* Navigation Buttons */}
      {renderButtons()}
    </View>
  );
};

export default Onboarding;
