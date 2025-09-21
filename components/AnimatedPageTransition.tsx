import React, { ReactNode } from "react";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface AnimatedPageTransitionProps {
  children: ReactNode;
  isVisible: boolean;
  direction?: "left" | "right" | "up" | "down";
  duration?: number;
  onAnimationComplete?: () => void;
}

const AnimatedPageTransition: React.FC<AnimatedPageTransitionProps> = ({
  children,
  isVisible,
  direction = "right",
  duration = 300,
  onAnimationComplete,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const getDirectionValues = () => {
    switch (direction) {
      case "left":
        return { translateX: 50, translateY: 0 };
      case "right":
        return { translateX: -50, translateY: 0 };
      case "up":
        return { translateX: 0, translateY: 50 };
      case "down":
        return { translateX: 0, translateY: -50 };
      default:
        return { translateX: -50, translateY: 0 };
    }
  };

  React.useEffect(() => {
    if (isVisible) {
      // Animation d'entrée
      translateX.value = withTiming(0, { duration });
      translateY.value = withTiming(0, { duration });
      opacity.value = withTiming(1, { duration });
      scale.value = withTiming(1, { duration }, () => {
        if (onAnimationComplete) {
          runOnJS(onAnimationComplete)();
        }
      });
    } else {
      // Animation de sortie
      const { translateX: exitX, translateY: exitY } = getDirectionValues();
      translateX.value = withTiming(exitX, { duration });
      translateY.value = withTiming(exitY, { duration });
      opacity.value = withTiming(0, { duration });
      scale.value = withTiming(0.95, { duration });
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          width: "100%",
        },
        animatedStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedPageTransition;
