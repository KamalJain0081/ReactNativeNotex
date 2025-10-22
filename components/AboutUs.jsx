import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AboutUs = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { width, height } = useWindowDimensions();
  const styles = getStyles(width, height);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <View>
            <Text style={styles.header}>
              Welcome to <Text style={styles.logoText}>NoteX</Text>!
            </Text>

            <Text style={styles.sectionText}>
              We are dedicated to providing the best note-taking experience for
              users. Our team is passionate about building tools that help you
              stay organized, productive, and inspired.
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (width, height) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#e7f2ef",
    },
    scrollContent: {
      paddingHorizontal: width * 0.06, // ~24px on 400px screen
      paddingVertical: height * 0.04, // ~32px on 800px height
    },
    header: {
      marginTop: height * 0.02,
      fontFamily: "Lora-Regular",
      fontSize: width * 0.08, // ~32 on 400px screen
      color: "#19183b",
    },
    sectionText: {
      fontSize: width * 0.05, // ~20
      lineHeight: width * 0.08, // ~32–34
      fontFamily: "Poppins",
      marginTop: height * 0.03,
      color: "#333",
    },
    logoText: {
      fontSize: width * 0.1, // ~40
      fontFamily: "YeonSung-Bold",
      color: "#708993",
    },
  });

export default AboutUs;
