// LandingPage.jsx
import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  useWindowDimensions,
  BackHandler,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icons from "./Icons";
import Buttons from "./Buttons";
import { useNavigation, CommonActions } from "@react-navigation/native";

const TITLE = "NoteX";

const LandingPage = () => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  // Animated values
  const headingLetters = useRef(
    TITLE.split("").map(() => new Animated.Value(0))
  ).current;

  const subheadingAnim = useRef(new Animated.Value(0)).current;
  const buttonsAnim = useRef(new Animated.Value(0)).current;
  const topIconAnim = useRef(new Animated.Value(0)).current;
  const bottomIconAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate icons
    Animated.parallel([
      Animated.spring(topIconAnim, {
        toValue: 1,
        friction: 5,
        tension: 30,
        useNativeDriver: true,
      }),
      Animated.spring(bottomIconAnim, {
        toValue: 1,
        friction: 5,
        tension: 30,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate heading letters
    const headingAnims = headingLetters.map((anim, i) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 300,
        delay: i * 150,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      })
    );

    // Chain heading, subheading, and buttons
    Animated.sequence([
      Animated.stagger(100, headingAnims),
      Animated.timing(subheadingAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.spring(buttonsAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Disable Android hardware back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        Alert.alert("Exit App", "Do you want to exit?", [
          { text: "Cancel", style: "cancel" },
          { text: "Exit", onPress: () => BackHandler.exitApp() },
        ]);
        return true; // prevent default behavior
      }
    );

    return () => backHandler.remove();
  }, []);

  const styles = getStyles(width, height);

  // Helper animations
  const slideUp = (anim) =>
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: [30, 0],
    });

  const scaleIn = (anim) =>
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    });

  const popStyle = (anim) => ({
    transform: [
      {
        scale: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.6, 1],
        }),
      },
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0],
        }),
      },
    ],
    opacity: anim,
  });

  // Navigate with stack reset
  const navigateReset = (screen) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: screen }],
      })
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Icon */}
        <View style={styles.topRow}>
          <Animated.View style={popStyle(topIconAnim)}>
            <Icons
              name="information-circle-outline"
              size={28}
              color="#34495e"
              onPress={() => navigation.navigate("AboutUs")}
            />
          </Animated.View>
        </View>

        {/* Animated Heading */}
        <View style={{ flexDirection: "row", marginBottom: height * 0.015 }}>
          {TITLE.split("").map((char, index) => (
            <Animated.Text
              key={index}
              style={[
                styles.heading,
                {
                  opacity: headingLetters[index],
                  transform: [
                    { translateY: slideUp(headingLetters[index]) },
                    { scale: scaleIn(headingLetters[index]) },
                  ],
                },
              ]}
            >
              {char}
            </Animated.Text>
          ))}
        </View>

        {/* Subheading */}
        <Animated.Text
          style={[
            styles.subHeading,
            {
              opacity: subheadingAnim,
              transform: [{ translateY: slideUp(subheadingAnim) }],
            },
          ]}
        >
          Share, Secure, and Organize{"\n"}Your Notes, Your Way!
        </Animated.Text>

        {/* Animated Buttons */}
        <Animated.View
          style={{
            opacity: buttonsAnim,
            transform: [
              { translateY: slideUp(buttonsAnim) },
              { scale: scaleIn(buttonsAnim) },
            ],
            width: "100%",
            alignItems: "center",
          }}
        >
          <Buttons
            title="Your Work Space"
            type="secondary"
            onPress={() => navigateReset("LoginScreen")}
          />
          <Buttons
            title="Create Your Space"
            type="primary"
            onPress={() => navigateReset("SignUpScreen")}
          />
        </Animated.View>

        {/* Bottom Icon */}
        <View style={styles.bottomRow}>
          <Animated.View style={popStyle(bottomIconAnim)}>
            <Icons
              name="help-circle-outline"
              size={28}
              color="#34495e"
              onPress={() => navigation.navigate("HelpPage")}
            />
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles
const getStyles = (width, height) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#f0f4f8",
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: width * 0.08,
      position: "relative",
    },
    topRow: {
      position: "absolute",
      top: height * 0.035,
      left: width * 0.06,
      zIndex: 10,
    },
    heading: {
      fontSize: width * 0.20,
      fontFamily: "YeonSung-Bold",
      color: "#34495e",
      textShadowColor: "rgba(52, 73, 94, 0.3)",
      textShadowOffset: { width: 0, height: 3 },
      textShadowRadius: 5,
      textAlign: "center",
    },
    subHeading: {
      fontSize: width * 0.050,
      fontFamily: "Lora-Regular",
      color: "#4a6fa5",
      textAlign: "center",
      marginBottom: height * 0.08,
      lineHeight: width * 0.065,
    },
    bottomRow: {
      position: "absolute",
      bottom: height * 0.035,
      right: width * 0.06,
      zIndex: 10,
    },
  });

export default LandingPage;
