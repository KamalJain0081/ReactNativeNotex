import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const scale = (size) => (width / 375) * size;

const AddNote = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const {
    noteID = null,
    title: initialTitle = "",
    description: initialDescription = "",
    isPrivate: initialIsPrivate = false,
    isNotifiable: initialIsNotifiable = false,
    noteColor: routeNoteColor,
    buttonText = "Add",
    onSave,
    onDelete,
    groupId = null, // Notes in group
  } = route.params || {};

  const baseColors = ["#FFB6B9", "#FFDE7D", "#7d8e94ff", "#c1f4cfff"];
  const initialColor = routeNoteColor || baseColors[0];
  const [colors] = useState(
    baseColors.includes(initialColor) ? baseColors : [...baseColors, initialColor]
  );

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [isPrivate, setIsPrivate] = useState(initialIsPrivate);
  const [isNotifiable, setIsNotifiable] = useState(initialIsNotifiable);
  const [selectedColor, setSelectedColor] = useState(initialColor);

  const handleSave = () => {
    if (onSave) {
      onSave({
        noteID,
        title: title.trim(),
        description: description.trim(),
        isPrivate,
        isNotifiable,
        noteColor: selectedColor,
        isActive: true,
        groupId,
      });
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    if (onDelete && noteID) {
      onDelete(noteID);
    }
    navigation.goBack();
  };

  return (
    <View style={[styles.safeArea, { backgroundColor: selectedColor }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            paddingTop: insets.top + scale(10),
            paddingBottom: insets.bottom + scale(20),
            paddingHorizontal: scale(20),
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={scale(20)} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerText}>{buttonText} Note</Text>
            <TouchableOpacity onPress={() => setIsNotifiable(!isNotifiable)}>
              <Ionicons
                name={isNotifiable ? "notifications" : "notifications-off-outline"}
                size={scale(22)}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text style={[styles.label, { marginTop: scale(24) }]}>Title:</Text>
          <View style={styles.card}>
            <TextInput
              style={styles.titleInput}
              placeholder="Title goes here..."
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#999"
              returnKeyType="next"
            />
          </View>

          {/* Description */}
          <Text style={styles.label}>Description:</Text>
          <View style={[styles.card, { minHeight: scale(120) }]}>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Write note details..."
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
              placeholderTextColor="#999"
            />
          </View>

          {/* Private Note toggle: Only for notes NOT in a group */}
          {!groupId && (
            <Pressable style={styles.checkboxRow} onPress={() => setIsPrivate(!isPrivate)}>
              <Text style={styles.checkboxText}>Private Note</Text>
              <Ionicons
                name={isPrivate ? "checkbox" : "square-outline"}
                size={scale(20)}
                color="#19183b"
              />
            </Pressable>
          )}

          {/* Color Picker */}
          <Text style={styles.label}>Choose Color:</Text>
          <View style={styles.colorRow}>
            {colors.map((color, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedColor(color)}
                style={[
                  styles.colorBox,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedBox,
                ]}
              />
            ))}
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.addBtn, !title.trim() && styles.disabledBtn]}
            onPress={handleSave}
            disabled={!title.trim()}
          >
            <Text style={styles.addBtnText}>{buttonText}</Text>
          </TouchableOpacity>

          {/* Delete Button */}
          {noteID && (
            <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
              <Text style={styles.deleteBtnText}>Delete</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    marginTop: 0,
    backgroundColor: "#19183b",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scale(12),
    paddingHorizontal: scale(14),
    borderRadius: scale(10),
  },
  headerText: {
    fontSize: scale(18),
    color: "#fff",
    fontFamily: "Montserrat-SemiBold",
  },
  label: {
    fontSize: scale(15),
    fontFamily: "Montserrat-SemiBold",
    color: "#19183b",
    marginBottom: scale(6),
    paddingLeft: scale(4),
  },
  titleInput: {
    fontSize: scale(14),
    color: "#19183b",
    paddingVertical: scale(6),
    fontFamily: "Montserrat-Regular",
  },
  card: {
    backgroundColor: "rgba(231,242,239,0.9)",
    borderRadius: scale(8),
    padding: scale(10),
    marginBottom: scale(14),
  },
  descriptionInput: {
    fontSize: scale(14),
    color: "#19183b",
    fontFamily: "Montserrat-Regular",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: scale(12),
  },
  checkboxText: {
    marginRight: scale(10),
    fontSize: scale(14),
    fontFamily: "Montserrat-SemiBold",
    color: "#19183b",
  },
  colorRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: scale(10),
  },
  colorBox: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(8),
    margin: scale(6),
  },
  selectedBox: {
    borderWidth: scale(2),
    borderColor: "#19183b",
  },
  addBtn: {
    backgroundColor: "#19183b",
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: scale(8),
    alignItems: "center",
    marginTop: scale(16),
  },
  disabledBtn: {
    backgroundColor: "#555",
  },
  addBtnText: {
    color: "#fff",
    fontFamily: "Montserrat-SemiBold",
    fontSize: scale(14),
  },
  deleteBtn: {
    backgroundColor: "#f75e5eff",
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: scale(8),
    alignItems: "center",
    marginTop: scale(10),
  },
  deleteBtnText: {
    color: "#fff",
    fontFamily: "Montserrat-SemiBold",
    fontSize: scale(14),
  },
});

export default AddNote;
