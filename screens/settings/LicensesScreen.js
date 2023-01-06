import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';

export default function ProgressScreen() {

  return (
    <View style={styles.container}>

      <Text>{JSON.stringify(require('./licenses.json'))}</Text>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});