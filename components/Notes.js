import React, { useEffect, useRef } from 'react';
import { Dimensions, View, StyleSheet, Text, Animated } from "react-native";

const { width } = Dimensions.get('window');
const noteWidth = (width - 60) / 2;

const Notes = ({ title, content, color = '#f8f9fa' }) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    // Trim content to first 35 characters
    const trimmedContent = content.length > 35 ? content.slice(0, 35) + '...' : content;

    return (
        <View style={[styles.noteContainer, { backgroundColor: color, width: noteWidth }]}>
            <Animated.Text style={[styles.noteTitle, { opacity }]}>
                {title}
            </Animated.Text>
            <Animated.Text style={[styles.noteContent, { opacity }]}>
                {trimmedContent}
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    noteContainer: {
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    noteTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#000000'
    },
    noteContent: {
        fontSize: 13,
        color: '#666666',
        lineHeight: 20,
    },
});

export default Notes;
