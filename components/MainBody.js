import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Animated,
    TouchableOpacity,
    Text,
    Modal,
    TextInput,
    Pressable,
    Switch,
    Alert,
    Vibration,
} from 'react-native';
import Notes from './Notes';
import ViewToggle from './ViewToggle';

const lightColors = [
    '#fff2cc', // light yellow
    '#d4edda', // light green
    '#f8d7da', // light pink/red
    '#d1ecf1', // light blue
    '#fcefe3', // light peach
    '#fff0f6', // very light pink
];

const MainBody = () => {
    const [viewMode, setViewMode] = useState('public');
    const [notesData, setNotesData] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [selectedColor, setSelectedColor] = useState(lightColors[0]);
    const [isPrivate, setIsPrivate] = useState(false);
    const [editingNote, setEditingNote] = useState(null);

    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');

    const fadeAnimationsLeft = useRef([]);
    const fadeAnimationsRight = useRef([]);

    const createBrickLayout = () => {
        const filteredNotes = notesData
            .filter(note => viewMode === 'public' ? !note.isPrivate : note.isPrivate)
            .reverse();

        const leftColumns = [];
        const rightColumns = [];

        filteredNotes.forEach((note, index) => {
            if (index % 2 === 0) leftColumns.push(note);
            else rightColumns.push(note);
        });

        return { leftColumns, rightColumns };
    };

    const { leftColumns, rightColumns } = createBrickLayout();

    useEffect(() => {
        fadeAnimationsLeft.current = leftColumns.map(() => new Animated.Value(0));
        fadeAnimationsRight.current = rightColumns.map(() => new Animated.Value(0));

        Animated.stagger(100, [
            Animated.stagger(
                50,
                fadeAnimationsLeft.current.map(anim =>
                    Animated.timing(anim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    })
                )
            ),
            Animated.stagger(
                50,
                fadeAnimationsRight.current.map(anim =>
                    Animated.timing(anim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    })
                )
            ),
        ]).start();
    }, [leftColumns.length, rightColumns.length, notesData, viewMode]);

    const openAddModal = () => {
        setEditingNote(null);
        setNewTitle('');
        setNewContent('');
        setSelectedColor(lightColors[0]);
        setIsPrivate(false);
        setTitleError('');
        setContentError('');
        setModalVisible(true);
    };

    const openEditModal = (note) => {
        setEditingNote(note);
        setNewTitle(note.title);
        setNewContent(note.content);
        setSelectedColor(note.color);
        setIsPrivate(note.isPrivate);
        setTitleError('');
        setContentError('');
        setModalVisible(true);
    };

    const handleAddNote = () => {
        let hasError = false;
        setTitleError('');
        setContentError('');

        if (!newTitle.trim()) {
            setTitleError('Title required !');
            hasError = true;
        }

        if (!newContent.trim()) {
            setContentError('Description required !');
            hasError = true;
        }

        if (hasError) {
            Vibration.vibrate(200);
            return;
        }

        const newNote = {
            id: notesData.length ? Math.max(...notesData.map(n => n.id)) + 1 : 1,
            title: newTitle,
            content: newContent,
            color: selectedColor,
            isPrivate: isPrivate,
        };

        setNotesData(prev => [...prev, newNote]);
        resetAndCloseModal();
    };

    const handleSaveEdit = () => {
        let hasError = false;
        setTitleError('');
        setContentError('');

        if (!newTitle.trim()) {
            setTitleError('Title required !');
            hasError = true;
        }

        if (!newContent.trim()) {
            setContentError('Description required !');
            hasError = true;
        }

        if (hasError) {
            Vibration.vibrate(200);
            return;
        }

        setNotesData(prev =>
            prev.map(note =>
                note.id === editingNote.id
                    ? {
                        ...note,
                        title: newTitle,
                        content: newContent,
                        color: selectedColor,
                        isPrivate: isPrivate,
                    }
                    : note
            )
        );
        resetAndCloseModal();
    };

    const handleDelete = () => {
        Alert.alert(
            "Delete Note",
            "Are you sure you want to delete this note?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        setNotesData(prev => prev.filter(note => note.id !== editingNote.id));
                        resetAndCloseModal();
                    }
                }
            ]
        );
    };

    const resetAndCloseModal = () => {
        setModalVisible(false);
        setEditingNote(null);
        setNewTitle('');
        setNewContent('');
        setSelectedColor(lightColors[0]);
        setIsPrivate(false);
        setTitleError('');
        setContentError('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.bodyWrapper}>
                <View style={styles.toggleWrapper}>
                    <ViewToggle mode={viewMode} onToggle={setViewMode} />
                </View>

                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.columnsContainers}
                >
                    <View style={styles.column}>
                        {leftColumns.map((note, index) => (
                            <Animated.View key={note.id} style={{ opacity: fadeAnimationsLeft.current[index] }}>
                                <TouchableOpacity onPress={() => openEditModal(note)}>
                                    <Notes title={note.title} content={note.content} color={note.color} />
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </View>

                    <View style={styles.column}>
                        {rightColumns.map((note, index) => (
                            <Animated.View key={note.id} style={{ opacity: fadeAnimationsRight.current[index] }}>
                                <TouchableOpacity onPress={() => openEditModal(note)}>
                                    <Notes title={note.title} content={note.content} color={note.color} />
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </View>
                </ScrollView>
            </View>

            <TouchableOpacity style={styles.floatingButton} onPress={openAddModal}>
                <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>

            <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={resetAndCloseModal}>
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: selectedColor }]}>
                        <Text style={styles.modalTitle}>{editingNote ? "Edit Note" : "Add New Note"}</Text>

                        <Text style={styles.label}>Title</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title goes here"
                            placeholderTextColor="#666"
                            value={newTitle}
                            onChangeText={setNewTitle}
                        />
                        {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}

                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Open your words here"
                            placeholderTextColor="#666"
                            value={newContent}
                            onChangeText={setNewContent}
                            multiline
                        />
                        {contentError ? <Text style={styles.errorText}>{contentError}</Text> : null}

                        <View style={styles.privacyToggleContainer}>
                            <Text style={styles.label}>Private Note?</Text>
                            <Switch
                                value={isPrivate}
                                onValueChange={setIsPrivate}
                                thumbColor={isPrivate ? "#007bff" : "#f4f3f4"}
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                            />
                        </View>

                        <Text style={[styles.label, { marginTop: 20 }]}>Select Color</Text>
                        <View style={styles.colorPickerContainer}>
                            {lightColors.map((color) => (
                                <TouchableOpacity
                                    key={color}
                                    style={[
                                        styles.colorCircle,
                                        { backgroundColor: color },
                                        selectedColor === color && styles.selectedCircle,
                                    ]}
                                    onPress={() => setSelectedColor(color)}
                                />
                            ))}
                        </View>

                        <View style={styles.modalButtons}>
                            <Pressable style={styles.cancelButton} onPress={resetAndCloseModal}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </Pressable>

                            {editingNote ? (
                                <>
                                    <Pressable style={styles.deleteButton} onPress={handleDelete}>
                                        <Text style={styles.buttonText}>Delete</Text>
                                    </Pressable>
                                    <Pressable style={styles.addButton} onPress={handleSaveEdit}>
                                        <Text style={styles.buttonText}>Save</Text>
                                    </Pressable>
                                </>
                            ) : (
                                <Pressable style={styles.addButton} onPress={handleAddNote}>
                                    <Text style={styles.buttonText}>Add</Text>
                                </Pressable>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f0f0' },
    bodyWrapper: { flex: 1, marginBottom: 20 },
    toggleWrapper: { marginBottom: 15 },
    scroll: { flex: 1 },
    columnsContainers: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'flex-start',
    },
    column: { flex: 1, marginHorizontal: 5 },
    floatingButton: {
        position: 'absolute',
        bottom: 90,
        right: 45,
        width: 50,
        height: 50,
        borderRadius: 20,
        backgroundColor: '#b8eab8ff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        zIndex: 10,
    },
    plusText: {
        color: '#000',
        paddingBottom: 5,
        fontSize: 38,
        lineHeight: 40,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        borderRadius: 12,
        padding: 25,
        elevation: 10,
    },
    modalTitle: {
        color: '#000',
        fontSize: 24,
        fontWeight: '900',
        fontFamily: 'Arial Black',
        marginBottom: 10,
    },
    label: {
        color: '#000',
        fontSize: 18,
        fontWeight: '700',
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#f9f9f9',
        fontSize: 14,
        color: '#000',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    errorText: {
        color: 'red',
        fontSize: 13,
        marginTop: 3,
        marginLeft: 2,
    },
    privacyToggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    colorPickerContainer: {
        flexDirection: 'row',
        marginTop: 8,
        flexWrap: 'wrap',
    },
    colorCircle: {
        width: 35,
        height: 35,
        borderRadius: 18,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedCircle: {
        borderColor: '#000',
        borderWidth: 3,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        marginTop: 20,
    },
    cancelButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: '#ccc',
        borderRadius: 5,
    },
    addButton: {
        paddingHorizontal: 22,
        paddingVertical: 8,
        backgroundColor: '#007bff',
        borderRadius: 5,
        marginLeft: 10,
    },
    deleteButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: '#dc3545',
        borderRadius: 5,
        marginLeft: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default MainBody;
