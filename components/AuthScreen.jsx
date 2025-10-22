import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Easing,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  updateUserProfile,
  verifyPassword,
  getUserProfile,
  setPassword,
} from "./UserProfile";

const { width, height } = Dimensions.get("window");

const AuthScreen = ({ mode = "Sign In" }) => {
  const isLogin = mode === "Sign In";

  const route = useRoute();
  const navigation = useNavigation();
  const prefillEmail = route.params?.prefillEmail || "";

  // Common states
  const [email, setEmail] = useState(prefillEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Sign Up extra states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Submit handler
  const handleSubmit = () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Email and password cannot be empty");
      return;
    }

    if (isLogin) {
      // Login logic: Just simulate success or failure
      const storedProfile = getUserProfile();

      if (email === storedProfile.email && verifyPassword(password)) {
        setSuccessMessage("Login successful!");
        navigation.navigate("MainBody");
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } else {
      // Sign Up validation for all fields
      if (!fullName.trim()) {
        setErrorMessage("Full Name is required");
        return;
      }
      if (!phone.trim()) {
        setErrorMessage("Phone number is required");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }

      // Store/update user profile (simulate)
      updateUserProfile({ fullName, email, phone });
      setPassword(password);
      setSuccessMessage("Sign Up successful! You can now sign in.");
      navigation.navigate("MainBody");
      // Reset fields after sign up
      setFullName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email.trim()) {
      setErrorMessage("Please enter your email to reset password");
      setSuccessMessage("");
      return;
    }

    setErrorMessage("");
    Alert.alert(
      "Password Reset",
      `A password reset link has been sent to ${email}. Please check your inbox.`,
      [{ text: "OK", onPress: () => console.log("Password reset email sent") }]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.welcome}>
            {isLogin ? "Welcome Back !!" : "Join Us !!"}
          </Text>
          <Text style={styles.subtitle}>
            {isLogin
              ? "The World is a very small place\nmy friend, Good to see you..."
              : "Adventure awaits!\nLet's create your account"}
          </Text>
        </View>

        <View style={styles.centeredContainer}>
          <Animated.View
            style={[
              styles.card,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.loginTitle}>
              {isLogin ? "Sign In" : "Sign Up"}
            </Text>

            {!isLogin && (
              <>
                {/* Full Name Input */}
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter full name"
                    placeholderTextColor="#999"
                    value={fullName}
                    onChangeText={(text) => {
                      setFullName(text);
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                    autoCapitalize="words"
                    textContentType="name"
                  />
                </View>

                {/* Phone Input */}
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Phone</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter phone number"
                    placeholderTextColor="#999"
                    value={phone}
                    onChangeText={(text) => {
                      setPhone(text);
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                  />
                </View>
              </>
            )}

            {/* Email Input */}
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  secureTextEntry={!showPassword}
                  autoComplete={isLogin ? "password" : "newPassword"}
                  textContentType={isLogin ? "password" : "newPassword"}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#19183b"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password on Sign Up */}
            {!isLogin && (
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    placeholderTextColor="#999"
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                    secureTextEntry={!showPassword}
                    autoComplete="newPassword"
                    textContentType="password"
                  />
                </View>
              </View>
            )}

            {/* Error and Forgot Password */}
            <View style={styles.rowBetween}>
              {errorMessage ? (
                <Text style={styles.error}>{errorMessage}</Text>
              ) : successMessage ? (
                <Text style={styles.success}>{successMessage}</Text>
              ) : (
                <View style={{ flex: 1 }} />
              )}

              {isLogin && (
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSubmit}
              activeOpacity={0.85}
            >
              <Text style={styles.loginButtonText}>
                {isLogin ? "Sign In" : "Sign Up"}
              </Text>
            </TouchableOpacity>

            {/* Switch Auth Mode */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(isLogin ? "SignUpScreen" : "LoginScreen")
              }
              style={{ marginTop: 18 }}
            >
              <Text style={styles.switchText}>
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <Text style={styles.switchTextHighlight}>Sign Up</Text>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Text style={styles.switchTextHighlight}>Sign In</Text>
                  </>
                )}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f8f9",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  headerContainer: {
    marginBottom: 25,
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
  },
  centeredContainer: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 25,
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  welcome: {
    fontSize: width * 0.08,
    fontWeight: "700",
    color: "#19183b",
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
  },
  subtitle: {
    fontSize: width * 0.038,
    color: "#555",
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
    lineHeight: 22,
  },
  loginTitle: {
    fontSize: width * 0.06,
    marginBottom: 20,
    textAlign: "center",
    textDecorationLine: "underline",
    color: "#19183b",
    fontWeight: "700",
    fontFamily: "Poppins_700Bold",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  inputLabel: {
    backgroundColor: "#19183b",
    color: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 14,
    fontSize: width * 0.03,
    fontWeight: "600",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: 95,
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
  },
  input: {
    flex: 1,
    backgroundColor: "#f6f9fc",
    paddingVertical: 14,
    paddingHorizontal: 14,
    fontSize: width * 0.04,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    color: "#19183b",
    fontFamily: "Montserrat_600SemiBold",
    shadowColor: "#19183b",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1.5,
  },
  passwordContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    padding: 6,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  error: {
    color: "#D93025",
    fontSize: width * 0.034,
    flex: 1,
    fontWeight: "600",
    fontFamily: "Montserrat_600SemiBold",
  },
  success: {
    color: "#188038",
    fontSize: width * 0.034,
    flex: 1,
    fontWeight: "600",
    fontFamily: "Montserrat_600SemiBold",
  },
  forgot: {
    color: "#D93025",
    fontSize: width * 0.034,
    fontWeight: "600",
    fontFamily: "Montserrat_600SemiBold",
  },
  loginButton: {
    backgroundColor: "#19183b",
    paddingVertical: height * 0.02,
    borderRadius: 12,
    shadowColor: "#19183b",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: width * 0.045,
    fontWeight: "700",
    fontFamily: "Poppins_700Bold",
  },
  switchText: {
    fontSize: width * 0.037,
    textAlign: "center",
    color: "#19183b",
    fontWeight: "600",
    fontFamily: "Montserrat_600SemiBold",
  },
  switchTextHighlight: {
    fontSize: width * 0.04,
    fontWeight: "700",
    color: "#19183b",
  },
});

export default AuthScreen;

