import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ViewToggle from './components/ViewToggle';

export default function App() {
  return (
    <ViewToggle />
    // <View style={styles.container}>
    //   <Text>Hello MiTro !!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
