import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [inputName, setInputName] = useState("");

  const saveName = async () => {
    if (!inputName) return;
    await AsyncStorage.setItem("userName", inputName); // 🔹 save AsyncStorage
    navigation.goBack(); // 🔹 just go back, HomeScreen AsyncStorage-ൽ നിന്ന് വായിക്കും
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>🔑 Enter Your Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="#aaa"
            value={inputName}
            onChangeText={setInputName}
          />

          <TouchableOpacity style={styles.button} onPress={saveName}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#1c1c1e",
    padding: 25,
    borderRadius: 12,
    marginTop: 20,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#444",
    width: "100%",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#2c2c2e",
    color: "white",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
