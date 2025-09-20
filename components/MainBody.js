import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Animated,
} from 'react-native';
import Notes from './Notes';
import ViewToggle from './ViewToggle';

const MainBody = ({viewMode, setViewMode}) => {
    const bgAnimation = useRef(new Animated.Value(0)).current;

    // Animation values for each note fade
    const fadeAnimationsLeft = useRef([]);
    const fadeAnimationsRight = useRef([]);

    const publicColor = '#f0f9ff';
    const privateColor = '#fff0f5';

    const notesData = [
        
        {
            id: 1,
            title: "Meeting Notes about Raindeer",
            content: "Discuss project timeline and deliverables for Q4. Need to follow up with team lead.",
            color: '#fff2cc',
            isPrivate: false,
        },
        {
            id: 2,
            title: "Shopping List",
            content: "Milk, Bread, Eggs, Coffee beans, Vegetables for dinner tonight",
            color: '#d4edda',
            isPrivate: true,
        },
        {
            id: 3,
            title: "Book Ideas",
            content: "The Power of Habit - Charles Duhigg\nAtomic Habits - James Clear\nMindset - Carol Dweck\n\nAll about building better habits and mindset",
            color: '#f8d7da',
            isPrivate: false,
        },
        {
            id: 4,
            title: "Weekend Plans",
            content: "Visit the new art gallery downtown, lunch with friends, grocery shopping",
            color: '#d1ecf1',
            isPrivate: true,
        },
        {
            id: 5,
            title: "Code Review for Parth ",
            content: "Check authentication logic, optimize database queries, update documentation",
            color: '#e2e3e5',
            isPrivate: false,
        },
        {
            id: 6,
            title: "Quick Reminder for my upcoming projects",
            content: "Call dentist",
            color: '#fff3cd',
            isPrivate: true,
        },
        {
            id: 7,
            title: "Workout Plan",
            content: "Monday: Chest\nTuesday: Back\nWednesday: Legs\nThursday: Shoulders\nFriday: Cardio",
            color: '#d1f7d8',
            isPrivate: false,
        },
        {
            id: 8,
            title: "Recipe Ideas",
            content: "Pasta primavera, Grilled salmon, Vegan Buddha bowl, Homemade pizza",
            color: '#fff0f5',
            isPrivate: true,
        },
        {
            id: 9,
            title: "Travel Bucket List",
            content: "Japan, New Zealand, Iceland, Greece, South Africa",
            color: '#f0f8ff',
            isPrivate: false,
        },
        {
            id: 10,
            title: "Learning Goals",
            content: "Finish React Native course, Practice JavaScript algorithms, Start TypeScript",
            color: '#fffacd',
            isPrivate: true,
        },
        {
            id: 11,
            title: "Project Ideas",
            content: "Mobile expense tracker app, Social media scheduler, AI chatbot integration",
            color: '#e0ffff',
            isPrivate: false,
        },
        {
            id: 12,
            title: "Book Ideas for reading",
            content: "The Power of Habit - Charles Duhigg\nAtomic Habits - James Clear\nMindset - Carol Dweck\n\nAll about building better habits and mindset",
            color: '#f8d7da',
            isPrivate: false,
        },
        {
            id: 13,
            title: "Weekend Plans with friends",
            content: "Visit the new art gallery downtown, lunch with friends, grocery shopping",
            color: '#d1ecf1',
            isPrivate: true,
        },
        {
            id: 14,
            title: "Code Review",
            content: "Check authentication logic, optimize database queries, update documentation",
            color: '#e2e3e5',
            isPrivate: false,
        },
        {
            id: 15,
            title: "Quick Reminder for my latest Projects",
            content: "Call dentist",
            color: '#fff3cd',
            isPrivate: true,
        }
    ];

    useEffect(() => {
        // Background color animation
        Animated.timing(bgAnimation, {
            toValue: viewMode === 'public' ? 0 : 1,
            duration: 800,
            delay: 150,
            useNativeDriver: false,
        }).start();
    }, [viewMode]);

    const backgroundColor = bgAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [publicColor, privateColor],
    });

    // Filter and split notes into columns based on viewMode
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

    // Initialize fade animations arrays with Animated.Values
    // Reset on every notes change
    useEffect(() => {
        fadeAnimationsLeft.current = leftColumns.map(() => new Animated.Value(0));
        fadeAnimationsRight.current = rightColumns.map(() => new Animated.Value(0));

        // Animate fade in with stagger effect
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
    }, [leftColumns.length, rightColumns.length]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.contentContainer,{backgroundColor }]}>
                <View style={styles.bodyWrapper}>
                    <View style={styles.toggleWrapper}>
                        <ViewToggle mode={viewMode} onToggle={setViewMode} />
                    </View>

                    <ScrollView
                        style={styles.scroll}
                        contentContainerStyle={styles.columnsContainers}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Left Column */}
                        <View style={styles.column}>
                            {leftColumns.map((note, index) => (
                                <Animated.View
                                    key={note.id}
                                    style={{ opacity: fadeAnimationsLeft.current[index] }}
                                >
                                    <Notes
                                        title={note.title}
                                        content={note.content}
                                        color={note.color}
                                    />
                                </Animated.View>
                            ))}
                        </View>

                        {/* Right Column */}
                        <View style={styles.column}>
                            {rightColumns.map((note, index) => (
                                <Animated.View
                                    key={note.id}
                                    style={{ opacity: fadeAnimationsRight.current[index] }}
                                >
                                    <Notes
                                        title={note.title}
                                        content={note.content}
                                        color={note.color}
                                    />
                                </Animated.View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    contentContainer: {
        flex: 1,
    },
    bodyWrapper: {
        flex: 1,
        marginBottom: 20,
    },
    toggleWrapper: {
        marginBottom: 15,
    },
    scroll: {
        flex: 1,
    },
    columnsContainers: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'flex-start',
    },
    column: {
        flex: 1,
        marginHorizontal: 5,
    },
});

export default MainBody;
