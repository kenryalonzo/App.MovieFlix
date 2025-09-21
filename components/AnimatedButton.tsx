import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  style?: any;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  style,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const getButtonStyles = () => {
    const baseStyles = "rounded-full items-center justify-center";

    switch (variant) {
      case "primary":
        return `${baseStyles} bg-accent`;
      case "secondary":
        return `${baseStyles} bg-secondary`;
      case "outline":
        return `${baseStyles} bg-transparent border-2 border-accent`;
      default:
        return `${baseStyles} bg-accent`;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return "px-4 py-2";
      case "medium":
        return "px-8 py-3";
      case "large":
        return "px-12 py-4";
      default:
        return "px-8 py-3";
    }
  };

  const getTextStyles = () => {
    const baseText = "font-semibold";

    if (variant === "outline") {
      return `${baseText} text-accent`;
    }

    return `${baseText} text-white`;
  };

  const handlePress = () => {
    if (!loading && !disabled) {
      scale.value = withSpring(
        0.95,
        {
          damping: 15,
          stiffness: 200,
        },
        () => {
          scale.value = withSpring(1, {
            damping: 15,
            stiffness: 200,
          });
          runOnJS(onPress)();
        }
      );
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: disabled ? 0.5 : opacity.value,
  }));

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={style}
    >
      <Animated.View
        className={`${getButtonStyles()} ${getSizeStyles()}`}
        style={animatedStyle}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === "outline" ? "#AB8BFF" : "#FFFFFF"}
          />
        ) : (
          <Text className={getTextStyles()}>{title}</Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AnimatedButton;
