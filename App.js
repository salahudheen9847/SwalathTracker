// App.js
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CounterScreen from "./screens/CounterScreen"; // 👈 പുതിയ Counter Screen
import DonateScreen from "./screens/DonateScreen";
import HistoryScreen from "./screens/HistoryScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#003366" }, // deep blue
          headerTintColor: "#fff", // white text
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Donate" component={DonateScreen} />
        <Stack.Screen name="Counter" component={CounterScreen} /> 
        {/* 👆 Counter Screen ചേർത്തു */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
