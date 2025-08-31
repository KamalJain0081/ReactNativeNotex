import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';


const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.logo}>NoteX</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header:{
        marginTop:38,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        alignItems: 'left'
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        paddingHorizontal: 10
    }
});

export default Header;