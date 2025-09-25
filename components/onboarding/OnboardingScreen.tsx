import React from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

interface OnboardingScreenProps {
  title: string;
  subtitle: string;
  description: string;
  image: any;
  backgroundColor?: string;
  onSkip?: () => void;
  showSkip?: boolean;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  title,
  subtitle,
  description,
  image,
  backgroundColor = "#030014",
  onSkip,
  showSkip = true,
}) => {
  return (
    <View style={{ flex: 1, backgroundColor }}>
      <StatusBar hidden />
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-8 justify-between">
          {/* Skip Button - Top Right */}
          {showSkip && onSkip && (
            <View className="absolute top-4 right-4 z-10">
              <TouchableOpacity
                onPress={onSkip}
                className="px-3 py-1"
                activeOpacity={0.7}
              >
                <Text className="text-light-300 text-sm underline">Skip</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Content Section */}
          <View className="flex-1 justify-center items-center pt-16">
            <View className="items-center">
              <Image
                source={image}
                className="w-72 h-72 mb-8"
                resizeMode="contain"
              />
              <Text className="text-white text-3xl font-bold text-center mb-2">
                {title}
              </Text>
              <Text className="text-accent text-xl font-semibold text-center mb-4">
                {subtitle}
              </Text>
              <Text className="text-light-200 text-base text-center leading-6 px-4">
                {description}
              </Text>
            </View>
          </View>

          {/* Bottom Section - Space for buttons */}
          <View className="h-20" />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OnboardingScreen;
