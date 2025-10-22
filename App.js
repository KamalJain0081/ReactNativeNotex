import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { YeonSung_400Regular } from "@expo-google-fonts/yeon-sung";
import { Lora_400Regular } from "@expo-google-fonts/lora";
import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import LandingPage from './components/LandingPage';
import MainBody from './components/MainBody';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import HelpPage from './components/HelpPage';
import AboutUs from './components/AboutUs';
import BodyButton from './components/BodyButton';
import AddNote from './components/AddNote';
import NoteCard from './components/NoteCard';
import GroupCard from './components/GroupCard';
import AddGroupCard from './components/AddGroupCard';
import GroupNotes from './components/GroupNotes';
import Profile from './components/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "YeonSung-Bold": YeonSung_400Regular,
    "Lora-Regular": Lora_400Regular,
    "Montserrat-SemiBold": Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="LandingPage"
        component={LandingPage}
        options={{ headerShown: false }} // 👈 Hide header
      />
      <Stack.Screen
        name="BodyButton"
        component={BodyButton}
        options={{ headerShown: false }} // 👈 Hide header
      />
      <Stack.Screen
        name="MainBody"
        component={MainBody}
        options={{ headerShown: false }} // 👈 Hide header
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }} // 👈 Hide header
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }} // 👈 Hide header
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }} // 👈 Hide header
      />
      <Stack.Screen
        name="HelpPage"
        component={HelpPage}
        options={{ headerShown: false }} // 👈 Hide header
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{ headerShown: false }} // 👈 Hide header
      />  
      <Stack.Screen
        name="AddNote"
        component={AddNote}
        options={{ headerShown: false }} // 👈 Hide header
      />  
      <Stack.Screen
        name="NoteCard"
        component={NoteCard}
        options={{ headerShown: false }} // 👈 Hide header
      />
      <Stack.Screen
        name="GroupCard"
        component={GroupCard}
        options={{ headerShown: false }} // 👈 Hide header
      />
      <Stack.Screen
        name="AddGroupCard"
        component={AddGroupCard}
        options={{ headerShown: false }} // 👈 Hide header
      />
      <Stack.Screen
        name="GroupNotes"
        component={GroupNotes}
        options={{ headerShown: false }} // 👈 Hide header
      />
    </Stack.Navigator>
  </NavigationContainer>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 42,
    marginBottom: 60,
    backgroundColor: '#e7f2ef',
  },
});
