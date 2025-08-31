import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';

const SIDEBAR_WIDTH = 200;

const SlidingSidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current; // 0 closed, 1 open

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  const sidebarRight = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-SIDEBAR_WIDTH, 0],
  });

  const arrowRotation = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Animated.View style={[styles.sidebarContainer, { right: sidebarRight }]}>
      <TouchableOpacity
        style={styles.arrowHandle}
        onPress={() => setExpanded(!expanded)}
      >
        <Animated.Text
          style={[styles.arrowText, { transform: [{ rotate: arrowRotation }] }]}
        >
          ←
        </Animated.Text>
      </TouchableOpacity>

      <View style={styles.sidebarContent}>
        <Text style={styles.sidebarText}>Groups</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    position: 'absolute',
    top: 120,
    bottom: 40,
    width: SIDEBAR_WIDTH + 35,
    height: 500,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1000,
  },
  arrowHandle: {
    width: 40,
    height: 100,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    zIndex: 1000,
  },
  arrowText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    zIndex: 1000,
  },
  sidebarContent: {
    width: SIDEBAR_WIDTH,
    height: '100%',
    backgroundColor: '#f1e9c4ff',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  sidebarText: {
    fontSize: 22,
    fontWeight: '600',
  },
});

export default SlidingSidebar;
