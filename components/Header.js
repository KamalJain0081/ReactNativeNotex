import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const Header = () => {

    const handleProfileClick = () => {
        Alert.alert("Profile", "User profile clicked!");
    };

    return (
        <View style={styles.header}>
            <Text style={styles.logo}>NoteX</Text>
            <TouchableOpacity onPress={handleProfileClick}>
                <FontAwesome name="user" size={26} color="#333" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header:{
        marginTop:43,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        // alignItems: 'left'
         flexDirection: 'row',              // row layout
        justifyContent: 'space-between',   // space between logo & icon
        alignItems: 'center' 
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        paddingHorizontal: 10
    }
});

export default Header;