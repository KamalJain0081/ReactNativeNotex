import React from "react";
import {
  TouchableOpacity,
  Text,
  useWindowDimensions,
  StyleSheet,
  Platform,
} from "react-native";

const scale = (size, width) => (size * width) / 414;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const Buttons = ({ title, type = "primary", onPress }) => {
  const { width, height } = useWindowDimensions();
  const styles = getStyles(width, height);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "secondary" ? styles.secondary : styles.primary,
        Platform.OS === "android" && { elevation: 4 },
      ]}
      onPress={onPress}
      activeOpacity={0.85}
      android_ripple={{ color: type === "primary" ? "#15395b" : "#cde5dc" }}
    >
      <Text
        style={[
          styles.text,
          type === "secondary" ? styles.secondaryText : styles.primaryText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const getStyles = (width, height) => {
  const paddingVertical = clamp(scale(14, width), 10, 18);
  const paddingHorizontal = clamp(scale(28, width), 18, 32);
  const borderRadius = clamp(scale(16, width), 12, 20);
  const fontSize = clamp(scale(16, width), 14, 18);
  const marginVertical = clamp(scale(10, height), 8, 14);

  return StyleSheet.create({
    button: {
      paddingVertical,
      paddingHorizontal,
      borderRadius,
      marginVertical,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    primary: {
      backgroundColor: "#34495e",
    },
    secondary: {
      backgroundColor: "#ecf0f1",
      borderWidth: 2,
      borderColor: "#34495e",
    },
    text: {
      fontSize,
      fontFamily: "Montserrat-SemiBold",
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    primaryText: {
      color: "#ecf0f1",
    },
    secondaryText: {
      color: "#34495e",
    },
  });
};

export default Buttons;
