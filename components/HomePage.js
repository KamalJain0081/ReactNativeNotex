import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Header from './Header';
import MainBody from './MainBody';

const HomePage = () => {
    return (
        <SafeAreaView style = {styles.container}>
            <Header />
            <ScrollView
    style={styles.content}
    contentContainerStyle={{ flexGrow: 1, alignItems: 'stretch' }}
    showsVerticalScrollIndicator={false}
>
                {/* The Main Body Content*/}
                <MainBody/>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ffffff'
    },
    content: {
        flex: 1,
    },
});
export default HomePage;