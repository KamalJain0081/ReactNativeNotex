// components/ViewToggle.jsx

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from "react-native";
import LottieView from "lottie-react-native";

// Correct relative import path for colorTransition.json
import colorTransitionAnimation from "../assets/colorTransition.json";

const ViewToggle = () => {
  const [activeView, setActiveView] = useState("public");
  const animationRef = useRef(null);

  useEffect(() => {
    if (animationRef.current) {
      if (activeView === "public") {
        animationRef.current.play(100, 0); // pink to blue (reverse)
      } else {
        animationRef.current.play(0, 100); // blue to pink
      }
    }
  }, [activeView]);

  const handlePress = (view) => {
    setActiveView(view);
  };

  return (
    <View style={styles.container}>
      {/* Lottie background animation */}
      <LottieView
        ref={animationRef}
        source={colorTransitionAnimation}
        autoPlay={false}
        loop={false}
        style={StyleSheet.absoluteFill}
      />

      {/* Buttons */}
      <View style={styles.toggleContainer}>
        <TouchableWithoutFeedback onPress={() => handlePress("public")}>
          <View
            style={[
              styles.button,
              { backgroundColor: "#B3E5FC", opacity: activeView === "public" ? 1 : 0.6 },
            ]}
          >
            <Text style={styles.buttonText}>Public</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => handlePress("private")}>
          <View
            style={[
              styles.button,
              { backgroundColor: "#F8BBD0", opacity: activeView === "private" ? 1 : 0.6 },
            ]}
          >
            <Text style={styles.buttonText}>Private</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 90,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  toggleContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    gap: 12,
    zIndex: 2,
  },
  button: {
    width: 100,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default ViewToggle;
