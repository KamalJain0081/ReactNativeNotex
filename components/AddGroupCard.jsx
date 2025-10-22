import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const AddGroupCard = ({ title, color }) => {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Text style={styles.cardText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width - 32, // full width minus padding
    height: 100,
    marginVertical: 8,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  cardText: {
    fontSize: 26,
    fontFamily: "Lora-Regular",
    color: "#000",
    textAlign: "center",
  },
});

export default AddGroupCard;
