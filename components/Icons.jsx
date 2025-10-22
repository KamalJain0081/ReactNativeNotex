import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Icons = ({ name, onPress, size }) => {
  const { width, height } = useWindowDimensions();
  const styles = getStyles(width, height);

  // If no size passed, default to responsive size
  const iconSize = size || Math.min(width, height) * 0.055; // ~30 on 667px height

  return (
    <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
      <Ionicons name={name} size={iconSize} color="#19183b" />
    </TouchableOpacity>
  );
};

const getStyles = (width, height) =>
  StyleSheet.create({
    iconContainer: {
      paddingVertical: height * 0.005, // small padding instead of negative margin
      paddingHorizontal: width * 0.01,
    },
  });

export default Icons;
