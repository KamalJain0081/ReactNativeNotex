import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import TopSection from "./TopSection";
import BodyButton from "./BodyButton";
import NoteCard from "./NoteCard";
import { useNavigation } from "@react-navigation/native";
import { dummyNotes, groupMeta } from "./dummyNotes";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BASE_WIDTH = 414;

const scaleFont = (size) => Math.round((size * SCREEN_WIDTH) / BASE_WIDTH * 0.9);
const scaleSize = (size) => Math.round((size * SCREEN_WIDTH) / BASE_WIDTH);

const MainBody = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [notes, setNotes] = useState(dummyNotes);
  const [filter, setFilter] = useState("private");
  const [groupFilter, setGroupFilter] = useState(false);

  const [selectedNote, setSelectedNote] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Add or update note
  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => {
      const noteExists = prevNotes.some((note) => note.noteID === newNote.noteID);

      if (noteExists) {
        return prevNotes.map((note) =>
          note.noteID === newNote.noteID ? { ...note, ...newNote } : note
        );
      } else {
        const nextID = prevNotes.length ? Math.max(...prevNotes.map((n) => n.noteID)) + 1 : 1;
        const noteWithID = { ...newNote, noteID: nextID, isActive: true };
        return [noteWithID, ...prevNotes];
      }
    });
  };

  // Soft delete note
  const handleDeleteNote = (noteIDToDelete) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.noteID === noteIDToDelete ? { ...note, isActive: false } : note
      )
    );
  };

  // Filter notes based on selected filter
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      if (!note.isActive) return false;

      if (filter === "private") {
        return note.isPrivate === true;
      }

      if (filter === "public") {
        // Only public notes not in any group
        return note.isPrivate === false && note.groupId === null;
      }

      return true;
    });
  }, [filter, notes]);

  // Sort notes by noteID descending
  const sortedNotes = useMemo(() => {
    return [...filteredNotes].sort((a, b) => b.noteID - a.noteID);
  }, [filteredNotes]);

  // Split into two columns
  const leftColumn = [];
  const rightColumn = [];
  sortedNotes.forEach((note, index) => {
    if (index % 2 === 0) leftColumn.push(note);
    else rightColumn.push(note);
  });

  // Open note modal
  const onNotePress = (note) => {
    setSelectedNote(note);
    setModalVisible(true);
  };

  // Navigate to edit note screen
  const onEditNote = () => {
    setModalVisible(false);
    setTimeout(() => {
      navigation.navigate("AddNote", {
        ...selectedNote,
        buttonText: "Update",
        onSave: handleAddNote,
        onDelete: handleDeleteNote,
      });
    }, 250);
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          paddingTop: scaleSize(insets.top * 0.04),
          paddingBottom: scaleSize(insets.bottom * 0.04),
        },
      ]}
    >
      <View style={{ marginBottom: scaleSize(12) }}>
        <TopSection />
      </View>

      {notes.length > 0 ? (
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            { paddingBottom: scaleSize(16 + insets.bottom) },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.columnsWrapper}>
            <View style={styles.column}>
              {leftColumn.map((note) => (
                <TouchableOpacity
                  key={note.noteID}
                  onPress={() => onNotePress(note)}
                  activeOpacity={0.8}
                  style={{ marginBottom: scaleSize(8) }}
                >
                  <NoteCard
                    {...note}
                    maxID={Math.max(...notes.map((n) => n.noteID))}
                    titleStyle={styles.noteTitle}
                    descriptionStyle={styles.noteDescription}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.column}>
              {rightColumn.map((note) => (
                <TouchableOpacity
                  key={note.noteID}
                  onPress={() => onNotePress(note)}
                  activeOpacity={0.8}
                  style={{ marginBottom: scaleSize(8) }}
                >
                  <NoteCard
                    {...note}
                    maxID={Math.max(...notes.map((n) => n.noteID))}
                    titleStyle={styles.noteTitle}
                    descriptionStyle={styles.noteDescription}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyNotesWrapper}>
          <Text style={styles.emptyNotesText}>
            {filter === "private"
              ? "You don't have any private notes"
              : "You don't have any public notes"}
          </Text>
        </View>
      )}

      {/* Modal Preview */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={[styles.noteTitle, { marginBottom: scaleSize(8) }]}>
              {selectedNote?.title}
            </Text>
            <ScrollView style={{ maxHeight: scaleSize(260) }}>
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

      <BodyButton
        notes={notes}
        setFilter={setFilter}
        currentFilter={filter}
        setShowGroups={setGroupFilter}
        handleAddNote={handleAddNote}
        buttonTextStyle={styles.addBtnText}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingHorizontal: scaleSize(16),
  },
  columnsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginHorizontal: scaleSize(4),
  },
  noteTitle: {
    fontSize: scaleFont(16),
    fontWeight: "700",
    color: "#222",
  },
  noteDescription: {
    fontSize: scaleFont(13),
    marginTop: scaleSize(3),
    lineHeight: scaleSize(18),
    color: "#444",
  },
  emptyNotesWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyNotesText: {
    fontSize: scaleFont(14),
    color: "#999",
  },
  addBtnText: {
    fontWeight: "700",
    fontSize: scaleFont(14),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    maxHeight: "70%",
    backgroundColor: "#fff",
    borderRadius: scaleSize(12),
    padding: scaleSize(16),
  },
  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleSize(16),
  },
  modalButton: {
    flex: 1,
    paddingVertical: scaleSize(10),
    marginHorizontal: scaleSize(5),
    borderRadius: scaleSize(8),
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: scaleFont(14),
  },
});

export default MainBody;
