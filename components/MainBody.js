import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import Notes from './Notes';

const  MainBody = () => {

    const notesData = [
        {
            id: 1,
            title: "Meeting Notes",
            content: "Discuss project timeline and deliverables for Q4. Need to follow up with team lead.",
            color: '#fff2cc'
        },
        {
            id: 2,
            title: "Shopping List",
            content: "Milk, Bread, Eggs, Coffee beans, Vegetables for dinner tonight",
            color: '#d4edda'
        },
        {
            id: 3,
            title: "Book Ideas",
            content: "The Power of Habit - Charles Duhigg\nAtomic Habits - James Clear\nMindset - Carol Dweck\n\nAll about building better habits and mindset",
            color: '#f8d7da'
        },
        {
            id: 4,
            title: "Weekend Plans",
            content: "Visit the new art gallery downtown, lunch with friends, grocery shopping",
            color: '#d1ecf1'
        },
        {
            id: 5,
            title: "Code Review",
            content: "Check authentication logic, optimize database queries, update documentation",
            color: '#e2e3e5'
        },
        {
            id: 6,
            title: "Quick Reminder",
            content: "Call dentist",
            color: '#fff3cd'
        },
    ];

    const createBrickLayout = () => {
        const leftColumns = [];
        const rightColumns = [];

        notesData.forEach((note,index) => {
            if(index % 2 === 0){
                leftColumns.push(note);
            }else{
                rightColumns.push(note);
            }
        });

        return {leftColumns, rightColumns};
    }

    const {leftColumns, rightColumns} = createBrickLayout();

    return (
        <View style = {styles.container}>
            <View style = {styles.columnsContainers}>
                {/*Left Column Notes*/}
                <View style = {styles.column}>
                    {leftColumns.map((note) => (
                        <Notes
                            key={note.id}
                            title={note.title}
                            content={note.content}
                            color={note.color}
                        />
                    ))}
                </View>

                {/* Right Column Notes */}
                <View style = {styles.column}>
                    {rightColumns.map((note) => (
                        <Notes 
                            key={note.id}
                            title={note.title}
                            content={note.content}
                            color={note.color}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingtop: 10,
        marginTop: 20,
    },
    columnsContainers : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    column : {
        flex : 1,
        marginHorizontal: 5,
    },
});

export default MainBody;