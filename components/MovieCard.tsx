import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolation,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { icons } from "@/constants/icons";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const tapGesture = Gesture.Tap()
    .onStart(() => {
      scale.value = withSpring(0.95, {
        damping: 15,
        stiffness: 200,
      });
    })
    .onEnd(() => {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 200,
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          scale.value,
          [0.95, 1],
          [1.05, 1],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  return (
    <Link href={`/movie/${id}`} asChild>
      <GestureDetector gesture={tapGesture}>
        <Animated.View className="w-[30%]" style={animatedStyle}>
          <Animated.Image
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
            }}
            className="w-full h-52 rounded-lg"
            resizeMode="cover"
            style={imageAnimatedStyle}
          />

          <Animated.Text
            className="text-sm font-bold text-white mt-2"
            numberOfLines={1}
            style={animatedStyle}
          >
            {title}
          </Animated.Text>

          <Animated.View
            className="flex-row items-center justify-start gap-x-1"
            style={animatedStyle}
          >
            <Image source={icons.star} className="size-4" />
            <Text className="text-xs text-white font-bold uppercase">
              {Math.round(vote_average / 2)}
            </Text>
          </Animated.View>

          <Animated.View
            className="flex-row items-center justify-between"
            style={animatedStyle}
          >
            <Text className="text-xs text-light-300 font-medium mt-1">
              {release_date?.split("-")[0]}
            </Text>
            <Text className="text-xs font-medium text-light-300 uppercase">
              Movie
            </Text>
          </Animated.View>
      </GestureDetector>
    </Link>
  );
};

export default MovieCard;
