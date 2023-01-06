import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QueryScreen() {

  const [vocabularies, setVocabularies] = useState([{original: '', translation: ''}]);
  const [translation, setTranslation] = useState('');
  const [finish, setFinish] = useState('');
  const [translated, setTranslated] = useState('');
  const [points, setPoints] = useState('');
  const [number, setNumber] = useState(0);
  const [buttonText, setButtonText] = useState('Auswerten');
  const [training, setTraining] = useState(true);
  const [trophies, setTrophies] = useState(0);

  const evaluate = () => {
    if(training){

      Keyboard.dismiss();
      if(vocabularies[number].translation == translation){
        setFinish('RICHTIG');
        setTranslated(vocabularies[number].translation);
        setPoints('Punkte: +10 🏆');
        setTrophies(trophies+10);
        saveTrophs(trophies+10);

      } else {
        setFinish('FALSCH');
        setTranslated(vocabularies[number].translation);
        setPoints('Punkte: +0 🏆');
      }
      setButtonText('Weiter');
      setTraining(false);

    } else {

      if(number < vocabularies.length-1) {
        setNumber(number+1);
      } else {
        setNumber(0);
      }
      setTranslation(null);
      setFinish('');
      setTranslated('');
      setPoints('');
      setButtonText('Auswerten');
      setTraining(true);

    }
  }

  const saveTrophs = async (trophs) => {
    try {
      await AsyncStorage.setItem('Trophies', JSON.stringify(trophs))
    } catch (error) {
      alert(error)
    }
  }

  const loadTrophs = async () => {
    try {
      let trophsJson = await AsyncStorage.getItem('Trophies')
      console.log(trophsJson)
      if(trophsJson !== null){
        console.log('loadTrophies');
        let trophs = JSON.parse(trophsJson)
        setTrophies(trophs)
      }
    } catch (error) {
      alert(error)
    }
  }

  const load = async () => {
    try {
      let vocabulariesJson = await AsyncStorage.getItem('Vocabularies')
      console.log(vocabulariesJson);
      if(vocabulariesJson !== null){
        console.log('load');
        let vocabularies = JSON.parse(vocabulariesJson)
        setVocabularies(vocabularies)
      }
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    load()
    loadTrophs()
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.previewContainer}>
        <Text style={styles.translationText}>Vokabel: {vocabularies[number].original}</Text>
      </View>

      <View style={styles.evaluateContainer}>
        <TextInput style={styles.input} placeholder='Übersetzung' value={translation} onChangeText={text => setTranslation(text) }/>
        <TouchableOpacity style={styles.evaluateButton} onPress={() => evaluate()}><Text>{buttonText}</Text></TouchableOpacity>
      </View>

      <View style={styles.finishContainer}>
        <Text style={styles.finishText}>{finish}</Text>
        <Text style={styles.translatedText}>{translated}</Text>
        <Text style={styles.pointsText}>{points}</Text>
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

  previewContainer: {
    alignItems: 'center',
    marginVertical: 100,
  },
  translationText: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 25,
  },
  evaluateContainer: {
    margin: 15,
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
  evaluateButton: {
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
  finishContainer: {
    alignItems: 'center',
  },
  finishText: {
    fontFamily: 'monospace',
    fontSize: 20,
    padding: 15,
  },
  translatedText: {
    fontFamily: 'monospace',
    fontSize: 20,
    padding: 5,
  },
  pointsText: {
    fontFamily: 'monospace',
    fontSize: 15,
    padding: 15,
  },
});

