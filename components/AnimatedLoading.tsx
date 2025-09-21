import React from "react";
import { View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface AnimatedLoadingProps {
  size?: "small" | "medium" | "large";
  color?: string;
  style?: any;
}

const AnimatedLoading: React.FC<AnimatedLoadingProps> = ({
  size = "medium",
  color = "#AB8BFF",
  style,
}) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 1000 }), -1, false);

    scale.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1, true);
  }, []);

  const getSize = () => {
    switch (size) {
      case "small":
        return 20;
      case "medium":
        return 40;
      case "large":
        return 60;
      default:
        return 40;
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
  }));

  const dotAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scale.value, [1, 1.2], [0.3, 1], Extrapolation.CLAMP),
  }));

  return (
    <View className="items-center justify-center" style={style}>
      <Animated.View
        style={[
          {
            width: getSize(),
            height: getSize(),
            borderRadius: getSize() / 2,
            borderWidth: 3,
            borderColor: color,
            borderTopColor: "transparent",
          },
          animatedStyle,
        ]}
      />

      {/* Dots animés */}
      <View className="flex-row mt-4 space-x-2">
        {[0, 1, 2].map((index) => (
          <Animated.View
            key={index}
            style={[
              {
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: color,
              },
              dotAnimatedStyle,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default AnimatedLoading;
