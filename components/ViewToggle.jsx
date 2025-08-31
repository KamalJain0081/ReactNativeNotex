import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import SlidingSidebar from './SlidingSidebar';

const ViewToggle = ({ mode, onToggle }) => {
  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      {/* Toggle Buttons */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            mode === 'public' && { backgroundColor: '#c3e3f8ff' },
          ]}
          onPress={() => onToggle('public')}
        >
          <Text style={styles.buttonText}>Public</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            mode === 'private' && { backgroundColor: '#f6bcb8ff' },
          ]}
          onPress={() => onToggle('private')}
        >
          <Text style={styles.buttonText}>Private</Text>
        </TouchableOpacity>
      </View>

      {/* Only show SlidingSidebar if mode is private */}
      {mode === 'private' && <SlidingSidebar />}
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginHorizontal: 10,
    elevation: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default ViewToggle;
