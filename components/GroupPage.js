import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import Notes from './Notes';

const GroupPage = ({groupData, onBack}) => {
    const getGroupNotes = (groupId) => {
        const groupNotesData = {
            1: [ // Work Projects
                {
                    id: 101,
                    title: "Q4 Project Planning",
                    content: "Define milestones, assign team members, set deadlines for Q4 deliverables",
                    color: '#e3f2fd',
                },
                {
                    id: 102,
                    title: "Client Meeting Notes",
                    content: "Discussed requirements for new feature implementation. Need follow-up by Friday",
                    color: '#f3e5f5',
                },
                {
                    id: 103,
                    title: "Code Review Checklist",
                    content: "Security audit, performance optimization, documentation updates required",
                    color: '#e8f5e8',
                },
            ],
            2: [ // Personal Notes
                {
                    id: 201,
                    title: "Weekend Plans",
                    content: "Visit farmer's market, lunch with family, finish reading current book",
                    color: '#fff3e0',
                },
                {
                    id: 202,
                    title: "Health Goals",
                    content: "Start morning walks, drink more water, prepare healthy meals for the week",
                    color: '#fce4ec',
                },
            ],
            3: [ // Ideas & Inspiration
                {
                    id: 301,
                    title: "App Ideas",
                    content: "Habit tracker with gamification, Local event discovery app, Recipe sharing platform",
                    color: '#e0f2f1',
                },
                {
                    id: 302,
                    title: "Creative Projects",
                    content: "Photography series about urban nature, Weekend pottery classes, Learn digital illustration",
                    color: '#f1f8e9',
                },
                {
                    id: 303,
                    title: "Book Concepts",
                    content: "Guide to minimalist living, Tech career advancement tips, Creative problem solving methods",
                    color: '#fef7e0',
                },
            ],
            4: [ // Meeting Minutes
                {
                    id: 401,
                    title: "Team Standup - Oct 15",
                    content: "Sprint progress review, blockers discussion, next week planning session scheduled",
                    color: '#e8eaf6',
                },
                {
                    id: 402,
                    title: "Client Presentation",
                    content: "Demonstrated new features, received positive feedback, contract renewal discussion pending",
                    color: '#f3e5f5',
                },
            ],
            5: [ // To-Do Lists
                {
                    id: 501,
                    title: "Daily Tasks",
                    content: "Respond to emails, Update project documentation, Schedule dentist appointment, Buy groceries",
                    color: '#e0f7fa',
                },
                {
                    id: 502,
                    title: "This Week",
                    content: "Complete performance reviews, Organize team building event, Prepare monthly report",
                    color: '#f9fbe7',
                },
            ],
        };

        return groupNotesData[groupId] || [];
    };

    const notes = getGroupNotes(groupData.id);

    const createBrickLayout = () => {
        const leftColumn = [];
        const rightColumn = [];

        notes.forEach((note, index) => {
            if (index % 2 === 0) leftColumn.push(note);
            else rightColumn.push(note);
        });

        return { leftColumn, rightColumn };
    };

    const { leftColumn, rightColumn } = createBrickLayout();
    
    return (
        <SafeAreaView style ={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{groupData.title}</Text>
                    <Text style = {styles.noteCount}>
                        {notes.length} {notes.length === 1 ? 'note':'notes'} 
                    </Text>
                </View>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.scrollContent}
                showsHorizontalScrollIndicator={false}
            >
                {notes.length > 0 ? (
                    <View style={styles.notesContainer}>
                        <View style={styles.column}>
                            {leftColumn.map((note) => (
                                <Notes
                                    key={note.id}
                                    title={note.title}
                                    content={note.content}
                                    color={note.color}
                                />
                            ))}
                        </View>

                        <View style={styles.column}>
                        {rightColumn.map((note) => (
                            <Notes
                                key={note.id}
                                title={note.title}
                                content={note.content}
                                color={note.color}
                            />
                        ))}
                        </View>
                    </View>
                ):(
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>No notes yet</Text>
                        <Text style={styles.emptySubtitle}>
                            Start adding notes to this group to see them here
                        </Text>
                    </View>
                )}
            </ScrollView>
            <TouchableOpacity style={styles.addButton} onPress={() => console.log('Add new note to group')}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        marginTop: 43,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    backButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
    backButtonText: {
        fontSize: 16,
        color: '#495057',
        fontWeight: '500',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#212529',
        textAlign: 'center',
    },
    noteCount: {
        fontSize: 14,
        color: '#6c757d',
        marginTop: 2,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 80, // Space for floating button
    },
    notesContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 20,
        alignItems: 'flex-start',
    },
    column: {
        flex: 1,
        marginHorizontal: 5,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingTop: 100,
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6c757d',
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 16,
        color: '#adb5bd',
        textAlign: 'center',
        lineHeight: 22,
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 56,
        height: 56,
        backgroundColor: '#4CAF50',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    addButtonText: {
        fontSize: 24,
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export default GroupPage;