import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Header from './Header';
import MainBody from './MainBody';

const HomePage = () => {
    return (
        <SafeAreaView style = {styles.container}>
            <Header />
            <ScrollView
                style = {styles.content}
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
        backgroundColor: '#ffffff'
    },
    content: {
        flex: 1,
    },
});
export default HomePage;