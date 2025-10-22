import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TextInput,
  FlatList,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import AddGroupCard from "./AddGroupCard";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const BASE_WIDTH = 414; // Reference screen width (iPhone 11 Pro Max width)

const scale = (size) => (width / BASE_WIDTH) * size;

const colorPalette = [
  '#CDEAC0', '#A0E7E5', '#B5EAD7', '#F3D1F4', '#C1F4C5',
  '#FFABAB', '#D4A5A5', '#FFD580', '#AEDFF7', '#FFB6C1',
];

const GroupCard = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const slideAnim = useRef(new Animated.Value(height)).current;
  const headerAnim = useRef(new Animated.Value(-scale(60))).current;
  const { notes = [] } = route.params || {};

  const groupedNotes = notes.filter(note => note.groupId != null);

  const groups = Object.values(
    groupedNotes.reduce((acc, note) => {
      if (!acc[note.groupId]) {
        acc[note.groupId] = {
          id: note.groupId,
          title: note.groupName || "Unnamed Group",
          color: note.groupColor || "#FFD580",
          notes: [],
        };
      }
      acc[note.groupId].notes.push(note);
      return acc;
    }, {})
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [groupsState, setGroups] = useState(groups);

  const handleDeleteGroup = (groupId) => {
    setGroups(groupsState.filter(g => g.id !== groupId));
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      delay: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(headerAnim, {
      toValue: 0,
      duration: 400,
      delay: 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorPalette.length);
    return colorPalette[randomIndex];
  };

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      const newGroup = {
        id: Date.now().toString(),
        title: newGroupName,
        color: getRandomColor(),
      };
      setGroups([newGroup, ...groupsState]);
      setNewGroupName("");
      setModalVisible(false);
    }
  };

  const renderGroupCard = ({ item }) => (
    <Pressable
      onPress={() =>
        navigation.navigate("GroupNotes", {
          group: item,
          notes: item.notes,
          onDeleteGroup: handleDeleteGroup,
        })
      }
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <AddGroupCard title={item.title} color={item.color} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { transform: [{ translateY: headerAnim }] }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="arrow-back" size={scale(20)} color="#fff" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.headerText} numberOfLines={1} ellipsizeMode="tail">
            Your Groups
          </Text>
        </View>
        <View style={{ width: scale(20) }} />
      </Animated.View>

      <FlatList
        data={groupsState}
        keyExtractor={(item) => item.id}
        renderItem={renderGroupCard}
        contentContainerStyle={{
          paddingVertical: scale(12),
          paddingHorizontal: scale(16),
          paddingBottom: scale(120),
        }}
        showsVerticalScrollIndicator={false}
      />

      <Animated.View
        style={[styles.bottomButtonContainer, { transform: [{ translateY: slideAnim }] }]}
      >
        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.addButtonPressed,
          ]}
          onPress={() => setModalVisible(true)}
          android_ripple={{ color: "#00000022" }}
        >
          <Text style={styles.buttonText}>Create New Group</Text>
        </Pressable>
      </Animated.View>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        presentationStyle="overFullScreen"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Group Name</Text>
            <TextInput
              placeholder="Group Name"
              style={styles.input}
              value={newGroupName}
              onChangeText={setNewGroupName}
              placeholderTextColor="#aaa"
              maxLength={30}
              returnKeyType="done"
              onSubmitEditing={handleAddGroup}
            />
            <View style={styles.modalButtons}>
              <Pressable
                style={({ pressed }) => [
                  styles.cancelButton,
                  pressed && styles.cancelButtonPressed,
                ]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.addButton,
                  pressed && styles.addButtonPressed,
                ]}
                onPress={handleAddGroup}
              >
                <Text style={styles.buttonText}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: scale(16),
    paddingTop: scale(50),
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: scale(60),
    left: scale(20),
    right: scale(20),
  },
  header: {
    backgroundColor: "#19183b",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    borderRadius: scale(12),
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: scale(2),
    elevation: 3,
  },
  headerText: {
    fontSize: scale(16),
    fontWeight: "600",
    letterSpacing: 0.5,
    color: "#fff",
    fontFamily: "Montserrat-SemiBold",
  },
  addButton: {
    backgroundColor: "#19183b",
    paddingVertical: scale(12),
    borderRadius: scale(8),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: scale(5),
    elevation: 5,
    flex: 1,
  },
  addButtonPressed: {
    backgroundColor: "#14132f",
  },
  cancelButton: {
    backgroundColor: "#999",
    paddingVertical: scale(12),
    borderRadius: scale(8),
    alignItems: "center",
    flex: 1,
  },
  cancelButtonPressed: {
    backgroundColor: "#777",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: scale(14),
    letterSpacing: 0.5,
    fontFamily: "Montserrat-SemiBold",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: scale(14),
    letterSpacing: 0.5,
    fontFamily: "Montserrat-SemiBold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: scale(12),
    padding: scale(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: scale(10),
    elevation: 10,
  },
  modalTitle: {
    fontSize: scale(14),
    fontWeight: "600",
    marginBottom: scale(10),
    color: "#19183b",
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: scale(8),
    padding: scale(10),
    marginBottom: scale(20),
    fontSize: scale(13),
    color: "#000",
    letterSpacing: 0.4,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: scale(10),
  },
});

export default GroupCard;
