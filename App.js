import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SearchDomains from "./Screens/SearchDomains";
import AddDomains from "./Screens/AddDomains";
import SubDomains from "./Screens/SubDomains";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SearchDomains"
          component={SearchDomains}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddDomains"
          component={AddDomains}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SubDomains"
          component={SubDomains}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8ff",
    alignItems: "center",
    justifyContent: "center",
  },
});
