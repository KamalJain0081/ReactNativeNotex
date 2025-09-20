import React,{useState} from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Header from './Header';
import MainBody from './MainBody';
import SlidingNavBar from './SlidingNavBar';
import GroupPage from './GroupPage';

const HomePage = () => {

    const [viewMode,setViewMode] = useState('public');
    const [currentPage, setCurrentPage] = useState('home'); // home or group
    const [selectedGroup, setSelectedGroup] = useState(null);

    const handleGroupSelect = (groupData) => {
        setSelectedGroup(groupData);
        setCurrentPage('group');
    };

    const handleBackToHome = () => {
        setCurrentPage('home');
        setSelectedGroup(null);
    }

    if(currentPage === 'group' && selectedGroup){
        return(
            <GroupPage
                groupData = {selectedGroup}
                onBack = {handleBackToHome}
            />
        )
    }

    return (
        <SafeAreaView style = {styles.container}>
            <Header />
            <ScrollView
                style = {styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* The Main Body Content*/}
                <MainBody viewMode={viewMode} setViewMode={setViewMode}/>
            </ScrollView>

            <SlidingNavBar 
                isVisible={viewMode === 'public'}
                onGroupSelect={handleGroupSelect}
             />
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