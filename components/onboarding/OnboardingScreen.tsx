import React from "react";
import { Dimensions, Image, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

interface OnboardingScreenProps {
  title: string;
  subtitle: string;
  description: string;
  image: any;
  backgroundColor?: string;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  title,
  subtitle,
  description,
  image,
  backgroundColor = "#030014",
}) => {
  return (
    <View style={{ flex: 1, backgroundColor }}>
      <StatusBar hidden />
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6 justify-between">
          {/* Content Section */}
          <View className="flex-1 justify-center items-center">
            <View className="items-center mb-12">
              <Image
                source={image}
                className="w-80 h-80 mb-8"
                resizeMode="contain"
              />
              <Text className="text-white text-3xl font-bold text-center mb-2">
                {title}
              </Text>
              <Text className="text-accent text-xl font-semibold text-center mb-4">
                {subtitle}
              </Text>
              <Text className="text-light-200 text-base text-center leading-6">
                {description}
              </Text>
            </View>
          </View>

          {/* Bottom Section - Space for buttons */}
          <View className="h-32" />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OnboardingScreen;
