import React from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const BASE_WIDTH = 375; // base width for scaling

const scale = (size) => (width / BASE_WIDTH) * size;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const MainButton = ({ title, onPress, isActive }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isActive && styles.activeButton]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {title === "+" ? (
        <Ionicons name="add" size={scale(18)} color={isActive ? "#19183b" : "#fff"} />
      ) : (
        <Text style={[styles.text, isActive && styles.activeText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#19183b",
    borderRadius: clamp(scale(8), 6, 12),
    paddingVertical: clamp(scale(6), 5, 10),
    paddingHorizontal: clamp(scale(18), 14, 24),
    marginHorizontal: clamp(scale(6), 5, 12),
    elevation: 2,
  },
  activeButton: {
    backgroundColor: "#fff",
  },
  text: {
    color: "#e7f2ef",
    fontSize: clamp(scale(14), 12, 16),
    fontFamily: "Montserrat-SemiBold",
    letterSpacing: 0.7,
  },
  activeText: {
    color: "#19183b",
  },
});

export default MainButton;
