
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './components/HomePage';

export default function App() {
  return (
    <HomePage />
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

