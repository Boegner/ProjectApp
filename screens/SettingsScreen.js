import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function ProgressScreen({ navigation }) {

  const deleteAll = async () => {
    try {
        await AsyncStorage.removeItem('Trophies')
    } catch (error) {
        alert(error)
    }
  } 

  return (
    <View style={styles.container}>

        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("Licenses")}><Text>Lizensen</Text></TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("PPolicy")}><Text>Datenschutzerklärung</Text></TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => deleteAll()}><Text>Fortschritt löschen</Text></TouchableOpacity>

        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  menuButton: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 7,
    padding: 10,
    borderRadius: 15,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity:  0.18,
    shadowRadius: 4.59,
    elevation: 5
  },
});