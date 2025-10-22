// Profile.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Modal,
  ScrollView,
  useWindowDimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { getUserProfile, updateUserProfile } from "./UserProfile";

const AVATARS = [
  require("../assets/avatars/avatar1.jpg"),
  require("../assets/avatars/avatar2.jpg"),
  require("../assets/avatars/avatar3.jpg"),
  require("../assets/avatars/avatar4.png"),
];

const Profile = () => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const PADDING_H = width * 0.05;
  const PADDING_V = height * 0.03;
  const AVATAR_PREVIEW_SIZE = width * 0.25;
  const AVATAR_GRID_ITEM = width * 0.18;
  const FONT_BASE = width * 0.038;
  const GAP = width * 0.03;
  const numColumns = Math.floor(width / (AVATAR_GRID_ITEM + GAP));

  const initialProfile = getUserProfile();
  const [name, setName] = useState(initialProfile.name);
  const [email, setEmail] = useState(initialProfile.email);
  const [phone, setPhone] = useState(initialProfile.phone);
  const [selectedAvatar, setSelectedAvatar] = useState(initialProfile.avatar);
  const [modalVisible, setModalVisible] = useState(false);

  const saveProfile = () => {
    updateUserProfile({ name, email, phone, avatar: selectedAvatar });
    navigation.goBack();
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => navigation.navigate("LandingPage"),
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => navigation.navigate("LandingPage"),
        },
      ]
    );
  };

  const openImagePicker = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access media is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setSelectedAvatar({ uri: result.assets[0].uri });
      setModalVisible(false);
    }
  };

  const saveAvatar = (avatar) => {
    setSelectedAvatar(avatar);
    setModalVisible(false);
  };

  const renderAvatarItem = ({ item }) => {
    const isSelected = item === selectedAvatar;
    return (
      <TouchableOpacity
        onPress={() => saveAvatar(item)}
        style={{
          width: AVATAR_GRID_ITEM,
          height: AVATAR_GRID_ITEM,
          borderRadius: AVATAR_GRID_ITEM * 0.18,
          margin: GAP / 3,
          borderWidth: isSelected ? 2 : 0,
          borderColor: isSelected ? "#19183b" : "transparent",
          overflow: "hidden",
        }}
      >
        <Image
          source={item}
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: PADDING_H,
          paddingTop: PADDING_V,
          paddingBottom: height * 0.05,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: height * 0.02,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={FONT_BASE * 1.4} color="#19183b" />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: FONT_BASE * 1.5,
              fontWeight: "600",
              color: "#19183b",
            }}
          >
            Profile
          </Text>

          <TouchableOpacity onPress={saveProfile}>
            <Ionicons name="checkmark" size={FONT_BASE * 1.6} color="#19183b" />
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <View style={{ alignItems: "center", marginBottom: height * 0.03 }}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={selectedAvatar}
              style={{
                width: AVATAR_PREVIEW_SIZE,
                height: AVATAR_PREVIEW_SIZE,
                borderRadius: AVATAR_PREVIEW_SIZE / 2,
                resizeMode: "cover",
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginTop: height * 0.015,
              fontSize: FONT_BASE * 1.1,
              fontWeight: "600",
              color: "#19183b",
            }}
          >
            {name}
          </Text>
        </View>

        {/* Form Fields */}
        {[{ label: "Name", value: name, setter: setName },
          { label: "Email", value: email, setter: setEmail },
          { label: "Phone", value: phone, setter: setPhone },
        ].map((field, index) => (
          <View key={index} style={{ marginBottom: height * 0.02 }}>
            <Text style={{ fontSize: FONT_BASE, color: "#444", marginBottom: 4 }}>
              {field.label}
            </Text>
            <TextInput
              value={field.value}
              onChangeText={field.setter}
              placeholder={`Enter ${field.label}`}
              style={{
                backgroundColor: "#f2f3f7",
                paddingVertical: height * 0.015,
                paddingHorizontal: width * 0.03,
                borderRadius: width * 0.025,
                fontSize: FONT_BASE,
                color: "#19183b",
                fontWeight: "500",
              }}
            />
          </View>
        ))}

        {/* Actions */}
        <View style={{ marginTop: height * 0.03 }}>
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              backgroundColor: "#19183b",
              paddingVertical: height * 0.015,
              borderRadius: width * 0.025,
              alignItems: "center",
              marginBottom: height * 0.015,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: FONT_BASE }}>
              Log out
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDeleteAccount}
            style={{
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#f75e5e",
              paddingVertical: height * 0.015,
              borderRadius: width * 0.025,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#f75e5e", fontWeight: "700", fontSize: FONT_BASE }}>
              Delete account
            </Text>
          </TouchableOpacity>
        </View>

        {/* Avatar Modal */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.6)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: width - 40,
                maxHeight: height - 100,
                backgroundColor: "#fff",
                borderRadius: 12,
                padding: 16,
              }}
            >
              <Text
                style={{
                  fontSize: FONT_BASE * 1.2,
                  fontWeight: "600",
                  marginBottom: 12,
                  color: "#19183b",
                }}
              >
                Select Avatar
              </Text>

              <FlatList
                data={AVATARS}
                renderItem={renderAvatarItem}
                keyExtractor={(_, idx) => idx.toString()}
                numColumns={numColumns}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ alignItems: "flex-start" }}
              />

              <TouchableOpacity
                onPress={openImagePicker}
                style={{
                  marginTop: 10,
                  marginBottom: 6,
                  backgroundColor: "#f2f2f2",
                  padding: 12,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#333", fontWeight: "600" }}>
                  Upload from Gallery
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: "#19183b",
                  paddingVertical: height * 0.015,
                  borderRadius: width * 0.025,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
