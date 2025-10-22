import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Modal,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import NoteCard from "./NoteCard.jsx";

const { width } = Dimensions.get("window");
const scale = (size) => (width / 375) * size;

const GroupNotes = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { group, notes: passedNotes = [], onDeleteGroup } = route.params;

  const [notes, setNotes] = useState(passedNotes);

  // Modal state for preview
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleSaveNote = (note) => {
    if (!note.title.trim()) return;

    setNotes((prevNotes) => {
      if (note.noteID) {
        return prevNotes.map((n) =>
          n.noteID === note.noteID ? { ...n, ...note } : n
        );
      } else {
        const nextID = prevNotes.length
          ? Math.max(...prevNotes.map((n) => n.noteID)) + 1
          : 1;
        return [
          {
            ...note,
            noteID: nextID,
            isActive: true,
            groupId: group.id,
          },
          ...prevNotes,
        ];
      }
    });
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((n) => n.isActive && n.groupId === group.id);
  }, [notes, group.id]);

  const sortedNotes = useMemo(() => {
    return [...filteredNotes].sort((a, b) => b.noteID - a.noteID);
  }, [filteredNotes]);

  const leftColumn = [];
  const rightColumn = [];

  sortedNotes.forEach((note, idx) => {
    if (idx % 2 === 0) leftColumn.push(note);
    else rightColumn.push(note);
  });

  // Open modal preview on note press
  const handleNotePress = (note) => {
    setSelectedNote(note);
    setModalVisible(true);
  };

  // Navigate to edit screen after closing modal
  const onEditNote = () => {
    setModalVisible(false);
    setTimeout(() => {
      navigation.navigate("AddNote", {
        ...selectedNote,
        buttonText: "Update",
        onSave: handleSaveNote,
        groupId: group.id,
        fromGroup: true, // pass the flag here
      });
    }, 250);
  };

  const handleAddNote = () => {
    navigation.navigate("AddNote", {
      buttonText: "Add",
      noteColor: group.color,
      onSave: handleSaveNote,
      groupId: group.id,
      fromGroup: true, // pass the flag here
    });
  };

  const handleDeleteGroupPress = () => {
    if (onDeleteGroup) {
      onDeleteGroup(group.id);
    }
    navigation.goBack();
  };

  const truncateDescription = (desc, wordLimit = 30) => {
    const words = desc.split(" ");
    if (words.length <= wordLimit) return desc;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const maxID = notes.length ? Math.max(...notes.map((n) => n.noteID)) : 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: group.color }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.leftIcon}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={scale(14)} color="#000" />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text
            style={[styles.headerText, { fontSize: scale(14) }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {group.title}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleDeleteGroupPress}
          style={styles.rightIcon}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="trash" size={scale(14)} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Notes or Empty State */}
      {sortedNotes.length === 0 ? (
        <Text style={styles.emptyText}>No notes yet. Create one!</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.columnsWrapper}>
            <View style={styles.column}>
              {leftColumn.map((note) => (
                <TouchableOpacity
                  key={note.noteID}
                  onPress={() => handleNotePress(note)} // modal preview
                  activeOpacity={0.8}
                >
                  <NoteCard
                    {...note}
                    maxID={maxID}
                    description={truncateDescription(note.description)}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.column}>
              {rightColumn.map((note) => (
                <TouchableOpacity
                  key={note.noteID}
                  onPress={() => handleNotePress(note)} // modal preview
                  activeOpacity={0.8}
                >
                  <NoteCard
                    {...note}
                    maxID={maxID}
                    description={truncateDescription(note.description)}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      {/* Add Note Button */}
      <Pressable
        style={[styles.addBtn, { backgroundColor: group.color }]}
        onPress={handleAddNote}
      >
        <Text style={styles.addBtnText}>
          <Ionicons name="add" size={scale(14)} color="#000" /> Add Note
        </Text>
      </Pressable>

      {/* Modal Preview */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={[styles.noteTitle, { marginBottom: scale(8) }]}>
              {selectedNote?.title}
            </Text>
            <ScrollView style={{ maxHeight: scale(280) }}>
              <Text style={styles.noteDescription}>{selectedNote?.description}</Text>
            </ScrollView>

            <View style={styles.modalButtonsRow}>
              <Pressable
                style={[styles.modalButton, { backgroundColor: "#333" }]}
                onPress={onEditNote}
              >
                <Text style={styles.modalButtonText}>Edit</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, { backgroundColor: "#999" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
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
    padding: scale(10),
    paddingTop: scale(40),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scale(16),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
    position: "relative",
  },
  leftIcon: {
    flex: 1,
    alignItems: "flex-start",
  },
  rightIcon: {
    flex: 1,
    alignItems: "flex-end",
  },
  titleContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontFamily: "Montserrat-SemiBold",
    color: "#000",
  },
  scrollContainer: {
    paddingTop: scale(24),
    paddingBottom: scale(70),
  },
  columnsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
  },
  emptyText: {
    color: "#555",
    textAlign: "center",
    marginTop: scale(220),
    fontSize: scale(12),
  },
  addBtn: {
    position: "absolute",
    bottom: scale(56),
    right: scale(30),
    paddingVertical: scale(10),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
  },
  addBtnText: {
    color: "#000",
    fontWeight: "600",
    fontSize: scale(12),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: scale(16),
  },
  modalContent: {
    width: "85%",
    maxHeight: "70%",
    backgroundColor: "#fff",
    borderRadius: scale(10),
    padding: scale(16),
  },
  noteTitle: {
    fontSize: scale(14),
    fontWeight: "700",
    color: "#222",
  },
  noteDescription: {
    fontSize: scale(12),
    marginTop: scale(3),
    lineHeight: scale(18),
    color: "#444",
  },
  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scale(16),
  },
  modalButton: {
    flex: 1,
    paddingVertical: scale(10),
    marginHorizontal: scale(4),
    borderRadius: scale(6),
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: scale(14),
  },
});

export default GroupNotes;
