import React, {useState, useRef, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    StyleSheet,
    Dimensions,
} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

const SlidingNavBar = ({isVisible, onGroupSelect}) => {
    const [isOpen,setIsOpen] = useState(false);
    const slideAnimation = useRef(new Animated.Value(-250)).current;
    const fadeAnimation = useRef(new Animated.Value(0)).current;

    const navigationItems = [
        { id: 1, title: 'work Projects', color: '#e3f2fd'},
        { id: 2, title: 'Personal Notes', color: '#f3e5f5' },
        { id: 3, title: 'Ideas & Inspiration', color: '#e8f5e8' },
        { id: 4, title: 'Meeting Minutes', color: '#fff3e0' },
        { id: 5, title: 'To-Do Lists', color: '#fce4ec' },
    ];

    useEffect(() => {
        if(isVisible){
            Animated.timing(fadeAnimation,{
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }else{
            setIsOpen(false);
            Animated.parallel([
                Animated.timing(slideAnimation,{
                    toValue: -250,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnimation,{
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [isVisible]);

    useEffect(() => {
        if(isVisible){
            Animated.timing(slideAnimation, {
                toValue: isOpen ? 0 : -250,
                duration: 400,
                useNativeDriver: true
            }).start();
        }
    }, [isOpen,isVisible]);

    const toggleNavigation = () => {
        if(isVisible) {
            setIsOpen(!isOpen);
        }
    };

    const handleItemPress = (item) => {
        console.log('Selected group: ', item.title);
        if(onGroupSelect){
            onGroupSelect(item);
        }
        // add the navigation on click logic here
        setIsOpen(false);
    };

    if(!isVisible){
        return null;
    }

    return(
        <>
            <Animated.View
                style = {[
                    styles.combinedContainer,
                    {
                        transform: [{ translateX: slideAnimation }],
                        opacity: fadeAnimation,
                    },
                ]}
            >
                <View style={styles.navigationPanel}>
                    <View style={styles.navContent}>
                        <Text style={styles.navTitle}>GROUPS</Text>

                        <View style={styles.itemsContainer}>
                            {
                                navigationItems.map((item) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={[styles.navItem, {backgroundColor: item.color }]}
                                        onPress={() => handleItemPress(item)}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={styles.navItemText}>{item.title}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>
                </View>

                {/** Tab button attached to panel */}
                <TouchableOpacity
                    style={styles.tabButton}
                    onPress={toggleNavigation}
                    activeOpacity={0.8}
                >
                    <Text style={styles.tabText}>
                        {Array.from('GROUPS').map((letter,index) => (
                            <Text key={index} style={styles.verticalText}>
                                {letter}{'\n'}
                            </Text>
                        ))}
                    </Text>
                </TouchableOpacity>
            </Animated.View>

            {/** Overlay for closing navigation on clicking outside*/}
            {isOpen && (
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    combinedContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        flexDirection: 'row',
        zIndex: 1000,
        elevation: 10,
    },
    navigationPanel: {
        width: 250,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 10,
    },
    navContent: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    navTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center',
    },
    itemsContainer: {
        flex: 1,
    },
    navItem: {
        padding: 16,
        marginVertical: 8,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    navItemText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
    },
    navTab: {
        position: 'absolute',
        left: 0,
        top: '13%',
        zIndex: 1001,
        elevation: 11,
    },
    tabButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 20,
        paddingHorizontal: 8,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        minHeight: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150,
        alignSelf: 'flex-start',
        minWidth: 30,
    },
    tabText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 12,
        lineHeight: 14,
    },
    verticalText: {
        textAlign: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 999,
    },
});

export default SlidingNavBar;