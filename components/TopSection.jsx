import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getUserProfile, subscribeProfile } from "./UserProfile";

const { width } = Dimensions.get("window");
const scale = (size) => (width / 375) * size;

const TopSection = () => {
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState(getUserProfile().avatar);

  const slideAnim = useRef(new Animated.Value(-scale(80))).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();
  }, []);

  // Subscribe to profile updates
  useEffect(() => {
    const unsubscribe = subscribeProfile((profile) => {
      setAvatar(profile.avatar);
    });
    return unsubscribe;
  }, []);

  const handleProfilePress = () => {
    navigation.navigate("Profile");
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: fadeAnim,
          paddingVertical: scale(10),
          paddingHorizontal: scale(18),
        },
      ]}
    >
      <Text style={[styles.title, { fontSize: scale(28), marginLeft: scale(16), paddingTop: scale(6) }]}>
        NoteX
      </Text>

      <TouchableOpacity
        style={[
          styles.iconContainer,
          {
            padding: scale(5),
            marginTop: scale(3),
            marginRight: scale(8),
            width: scale(44),
            height: scale(44),
            borderRadius: scale(999),
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: avatar ? "transparent" : "rgba(255,255,255,0.06)",
          },
        ]}
        onPress={handleProfilePress}
      >
        {avatar ? (
          <Animated.Image
            source={avatar}
            style={{ width: "100%", height: "100%", borderRadius: scale(999) }}
          />
        ) : (
          <Ionicons name="person" size={scale(18)} color="#fff" />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#19183b",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "YeonSung-Bold",
    fontWeight: "600",
    color: "#fff",
  },
  iconContainer: {
    borderRadius: 50,
  },
});

export default TopSection;
