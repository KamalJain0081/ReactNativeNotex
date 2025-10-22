import React, { useEffect, useRef } from "react";
import {
  Linking,
  Text,
  View,
  Animated,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HelpPage = () => {
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
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Help & Support</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How to Create a Note</Text>
            <Text style={styles.sectionText}>1. Tap the 'Create' button...</Text>
            <Text style={styles.sectionText}>2. Enter your note content....</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>FAQs</Text>
            <Text style={styles.sectionText}>
              Q. How do I sync notes across devices?
            </Text>
            <Text style={styles.sectionText}>
              A. You can sync your notes through cloud storage by logging in with
              your email.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Support</Text>
            <Text style={styles.sectionText}>
              If you need help, please contact us at:{" "}
              <Text
                style={styles.emailLink}
                onPress={() => Linking.openURL("mailto:support@yourapp.com")}
              >
                support@yourapp.com
              </Text>
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
    container: {
      paddingHorizontal: width * 0.05, // ~20 on 400px width
      paddingTop: height * 0.03,
      paddingBottom: height * 0.05,
    },
    header: {
      alignItems: "center",
      marginBottom: height * 0.03,
    },
    headerText: {
      fontSize: width * 0.06, // ~24 on 400px width
      fontFamily: "Lora-Regular",
      fontWeight: "bold",
      color: "#19183b",
    },
    section: {
      marginBottom: height * 0.025,
    },
    sectionTitle: {
      fontSize: width * 0.05, // ~18
      fontWeight: "600",
      color: "#333",
      marginBottom: 5,
    },
    sectionText: {
      fontSize: width * 0.045, // ~16
      color: "#444",
      marginVertical: 4,
      fontFamily: "Poppins",
    },
    emailLink: {
      color: "#007aff",
      textDecorationLine: "underline",
    },
  });

export default HelpPage;
