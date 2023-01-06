import HomeScreen from "./screens/HomeScreen";
import QueryScreen from "./screens/QueryScreen";
import ProgressScreen from "./screens/ProgressScreen";
import SettingsScreen from "./screens/SettingsScreen"
import LicensesScreen from "./screens/settings/LicensesScreen";
import PPolicyScreen from "./screens/settings/PPolicyScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Query" component={QueryScreen} options={{title: 'Abfrage'}}/>
        <Stack.Screen name="Progress" component={ProgressScreen} options={{title: 'Fortschritt'}}/>
        <Stack.Screen name="Settings" component={SettingsScreen} options={{title: 'Einstellungen'}}/>
        <Stack.Screen name="Licenses" component={LicensesScreen} options={{title: 'Lizensen'}}/>
        <Stack.Screen name="PPolicy" component={PPolicyScreen} options={{title: 'Datenschutzerklärung'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}