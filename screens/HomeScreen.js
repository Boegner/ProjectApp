import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton } from 'react-native-paper';
import Vocabulary from './components/Vocabulary';

export default function HomeScreen({ navigation }) {
  const [vocabularies, setVocabularies] = useState([]);
  const [original, setOriginal] = useState('');
  const [translation, setTranslation] = useState('');

  const save = async (voc) => {
    try {
      await AsyncStorage.setItem('Vocabularies', JSON.stringify(voc))
    } catch (error) {
      alert(error)
    }
  }

  const load = async () => {
    try {
      let vocabulariesJson = await AsyncStorage.getItem('Vocabularies')
      console.log(vocabulariesJson);

      if(vocabulariesJson !== null){
        let vocabularies = JSON.parse(vocabulariesJson)
        setVocabularies(vocabularies)
      }
    } catch (error) {
      alert(error)
    }
  }

  const addVocabulary = () => {
    Keyboard.dismiss();
    setVocabularies([...vocabularies, {original: original, translation: translation}]);
    save([...vocabularies, {original: original, translation: translation}]);
    setOriginal(null);
    setTranslation(null);
  }

  const deleteVocabulary = (index) => {
    let itemsCopy = [...vocabularies];
    itemsCopy.splice(index, 1);
    setVocabularies(itemsCopy);
    save(itemsCopy);
  }

  const haveVoc = () => {
    if(vocabularies == undefined || vocabularies.length == 0) {
      Alert.alert('Du hast noch keine Vokabeln');
    } else {
      navigation.navigate("Query");
    }
  }

  useEffect(() => {
    load()
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.settingsContainer}>
        <IconButton icon='cog' size={25} onPress={() => navigation.navigate("Settings")}/>
      </View>

      {/*It's the code part for the vocabularies! e.g.: Headlines, Cards*/}
      <ScrollView style={styles.vocabularyContainer}>

        <Text style={styles.vocabularyHeadline}>Vokabeln:</Text>

        {
        vocabularies.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => deleteVocabulary(index)}> 
                <Vocabulary original={item.original} translation={item.translation} />
              </TouchableOpacity>
            )
        })
        }

      </ScrollView>

      {/*Part for the menu! e.g.: Add Vocabularies, navigation*/}
      <View style={styles.menuContainer}>
        <View style={styles.addVocContainer}>
          <TextInput style={styles.input} placeholder='Original Text' value={original} onChangeText={text => setOriginal(text) }/>
          <TextInput style={styles.input} placeholder='Übersetzter Text' value={translation} onChangeText={text => setTranslation(text) }/>
          <TouchableOpacity style={styles.addVocButton} onPress={() => {addVocabulary()}}><Text>Hinzufügen</Text></TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.menuButton} onPress={() => haveVoc()}><Text>Abfrage</Text></TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("Progress")}><Text>Fortschritt</Text></TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  settingsContainer: {
    marginTop: 40,
    flexDirection: 'row-reverse',
  },

  /*Vocabulary part*/

  vocabularyContainer: {
    margin: 10,
  },
  vocabularyHeadline: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 50,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 25,
  },

  /*Menu part*/

  menuContainer: {
    margin: 25,
  },

  /*Add Vocabularies*/
  addVocContainer: {
    padding: 20,
    backgroundColor: '#e6e6fa',
    borderRadius: 15,
    marginBottom: 7,
  },
  input: {
    fontSize: 15,
    padding: 5,
    backgroundColor: '#FFF',
    margin: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity:  0.16,
    shadowRadius: 1.51,
    elevation: 2
  },
  addVocButton: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    margin: 10,
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

