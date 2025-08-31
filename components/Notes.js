import React from 'react';
import { Dimensions, View, StyleSheet, Text } from "react-native";

const {width} = Dimensions.get('window');
const noteWidth = (width - 60) / 2;

const Notes = ({title,content,color = '#f8f9fa'}) => {
    return(
        <View style = {[styles.noteContainer, {backgroundColor : color, width: noteWidth}]}>
            <Text style = {styles.noteTitle}>{title}</Text>
            <Text style = {styles.noteContent}>{content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    noteContainer : {
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