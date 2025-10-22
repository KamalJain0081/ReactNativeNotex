import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  Dimensions,
  Platform,
} from "react-native";
import MainButton from "./MainButton";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// Scale function relative to base width (375 = iPhone 11 width)
const scale = (size) => (width / 375) * size;

const BodyButton = ({ setFilter, currentFilter, notes, handleAddNote }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets(); // Get safe area values

  const hasActivePublic = notes.some((note) => !note.isPrivate && note.isActive);
  const hasActivePrivate = notes.some((note) => note.isPrivate && note.isActive);

  const publicScale = useRef(new Animated.Value(0)).current;
  const privateScale = useRef(new Animated.Value(0)).current;
  const addScale = useRef(new Animated.Value(0)).current;

  const extraTranslateY = useRef(new Animated.Value(scale(40))).current;
  const extraOpacity = useRef(new Animated.Value(0)).current;
  const mainButtonsTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animations = [];
    if (hasActivePublic) animations.push(animateButton(publicScale));
    if (hasActivePrivate) animations.push(animateButton(privateScale));
    animations.push(animateButton(addScale));

    Animated.stagger(100, animations).start();
  }, [hasActivePublic, hasActivePrivate]);

  useEffect(() => {
    if (currentFilter === "public") {
      Animated.parallel([
        Animated.timing(extraTranslateY, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.poly(4)),
          useNativeDriver: true,
        }),
        Animated.timing(extraOpacity, {
          toValue: 1,
          duration: 400,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(mainButtonsTranslateY, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.poly(4)),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(extraTranslateY, {
          toValue: scale(20),
          duration: 400,
          easing: Easing.in(Easing.poly(4)),
          useNativeDriver: true,
        }),
        Animated.timing(extraOpacity, {
          toValue: 0,
          duration: 400,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(mainButtonsTranslateY, {
          toValue: scale(20),
          duration: 400,
          easing: Easing.in(Easing.poly(4)),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [currentFilter]);

  const animateButton = (animatedValue) =>
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    });

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingBottom: insets.bottom + scale(10), // Responsive + safe bottom spacing
        },
      ]}
    >
      <Animated.View
        style={[styles.buttonContainer, { transform: [{ translateY: mainButtonsTranslateY }] }]}
      >
        {hasActivePublic && (
          <Animated.View style={{ transform: [{ scale: publicScale }], marginHorizontal: scale(6) }}>
            <MainButton
              title="Public"
              onPress={() => setFilter("public")}
              isActive={currentFilter === "public"}
              buttonStyle={{ paddingVertical: scale(10), paddingHorizontal: scale(18) }}
              textStyle={{ fontSize: scale(16) }}
            />
          </Animated.View>
        )}

        {hasActivePrivate && (
          <Animated.View style={{ transform: [{ scale: privateScale }], marginHorizontal: scale(6) }}>
            <MainButton
              title="Private"
              onPress={() => setFilter("private")}
              isActive={currentFilter === "private"}
              buttonStyle={{ paddingVertical: scale(10), paddingHorizontal: scale(18) }}
              textStyle={{ fontSize: scale(16) }}
            />
          </Animated.View>
        )}

        <Animated.View style={{ transform: [{ scale: addScale }], marginHorizontal: scale(6) }}>
          <MainButton
            title="+"
            onPress={() =>
              navigation.navigate("AddNote", {
                buttonText: "Add",
                onSave: handleAddNote,
              })
            }
            buttonStyle={{
              width: scale(50),
              height: scale(50),
              borderRadius: scale(25),
              justifyContent: "center",
              alignItems: "center",
            }}
            textStyle={{ fontSize: scale(28), lineHeight: scale(32) }}
          />
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={[
          styles.extraButtonWrapper,
          {
            opacity: extraOpacity,
            transform: [{ translateY: extraTranslateY }],
          },
        ]}
        pointerEvents={currentFilter === "public" ? "auto" : "none"}
      >
        <MainButton
          title="Group"
          onPress={() => navigation.navigate("GroupCard", { notes })}
          buttonStyle={{ paddingVertical: scale(10), paddingHorizontal: scale(22) }}
          textStyle={{ fontSize: scale(16) }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    bottom: 0, // Stick to bottom, padding will adjust for safe area
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  extraButtonWrapper: {
    marginTop: 15,
  },
});

export default BodyButton;
