import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ViewToggle = ({ mode, onToggle }) => {
    return (
        <View style={styles.toggleContainer}>
            <TouchableOpacity
                style={[
                    styles.button,
                    mode === 'public' && { backgroundColor: '#f0f9ff' }
                ]}
                onPress={() => onToggle('public')}
            >
                <Text style={styles.buttonText}>Public</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.button,
                    mode === 'private' && { backgroundColor: '#fff0f5' }
                ]}
                onPress={() => onToggle('private')}
            >
                <Text style={styles.buttonText}>Private</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        marginHorizontal: 5,
        elevation: 2,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export default ViewToggle;
