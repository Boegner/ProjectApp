import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProgressScreen() {
  
  const [trophies, setTrophies] = useState(0);
  const [images, setImages] = useState(require('./levels/LevelOne.png'));
  const [levelPro, setLevelPro] = useState('0 🏆 - 1000 🏆');

  const loadLevel = (trophs) => {
    if(trophs < 1000) {
      setImages(require('./levels/LevelOne.png'));
      setLevelPro('0 🏆 - 999 🏆');
    } else if(trophs < 2500) {
      setImages(require('./levels/LevelTwo.png'));
      setLevelPro('1000 🏆 - 2499 🏆');
    } else if(trophs < 5000) {
      setImages(require('./levels/LevelThree.png'));
      setLevelPro('2500 🏆 - 4999 🏆');
    }
  }

  const load = async () => {
    try {
      let trophsJson = await AsyncStorage.getItem('Trophies')
      console.log(trophsJson);
      if(trophsJson !== null){
        console.log('load');
        let trophs = JSON.parse(trophsJson)
        setTrophies(trophs)
        loadLevel(trophs)
      } else {
        setTrophies(0)
      }
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    load()
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.progressContainer}>
        <Text style={styles.progressHeadline}>Pokale: {trophies} 🏆</Text>
        <Image style={styles.images} source={images} />
        <Text style={styles.levelProText}>{levelPro}</Text>
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

  progressContainer: {
    backgroundColor: '#FFF',
    margin: 25,
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity:  0.16,
    shadowRadius: 1.51,
    elevation: 2
  },
  progressHeadline: {
    marginVertical: '30%',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 20,
  },
  images: {
    height: 250,
    width: 250,
  },
  levelProText: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 15,
    marginBottom: 20,
  },
});