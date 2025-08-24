// HomeScreen.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { db } from "../firebase";

export default function HomeScreen({ navigation }) {
  const goal = 100000;
  const [completed, setCompleted] = useState(0);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [userName, setUserName] = useState("");

  // Load saved data + username
  useEffect(() => {
    (async () => {
      const savedCompleted = await AsyncStorage.getItem("completedSwalath");
      const savedHistory = await AsyncStorage.getItem("swalathHistory");
      const savedUserName = await AsyncStorage.getItem("userName");

      if (savedCompleted) setCompleted(parseInt(savedCompleted));
      if (savedHistory) setHistory(JSON.parse(savedHistory));
      if (savedUserName) setUserName(savedUserName);
    })();
  }, []);

  // Save data to storage + Firestore
  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem("completedSwalath", completed.toString());
      await AsyncStorage.setItem("swalathHistory", JSON.stringify(history));
      if (userName) {
        await setDoc(doc(db, "users", userName), { completed, history });
      }
    })();
  }, [completed, history, userName]);

  const progressPercent = Math.min((completed / goal) * 100, 100);

  function addSwalath() {
    const value = parseInt(input);
    if (isNaN(value)) {
      Alert.alert("Invalid input", "Please enter a number");
      return;
    }
    const date = new Date();
    const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    setHistory([{ value, date: dateStr }, ...history]);
    const newTotal = completed + value;
    if (newTotal <= goal) setCompleted(newTotal);
    else {
      Alert.alert("Goal reached!", "Starting new 1 lakh cycle.");
      setCompleted(value);
    }
    setInput("");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Input */}
        <TextInput
          placeholder="Enter Swalath Number"
          keyboardType="numeric"
          value={input}
          onChangeText={setInput}
          style={styles.input}
          placeholderTextColor="#888"
        />

        {/* Title */}
        <Text style={styles.title}>🌙 Swalath Tracker</Text>
        <Text style={styles.subtitle}>(1 Lakh Cycle)</Text>

        {/* Buttons */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#007bff" }]}
          onPress={addSwalath}
        >
          <Text style={styles.buttonText}>➕ Add Swalath</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#6a1b9a" }]}
          onPress={() => navigation.navigate("History")}
        >
          <Text style={styles.buttonText}>📖 View History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ff9800" }]}
          onPress={() => navigation.navigate("Counter")}
        >
          <Text style={styles.buttonText}>🔢 Counter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#009688" }]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>🔑 Login / Backup</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "crimson" }]}
          onPress={() => navigation.navigate("Donate")}
        >
          <Text style={styles.buttonText}>❤️ Donate</Text>
        </TouchableOpacity>

        {/* Progress Info */}
        <View style={styles.card}>
          <Text style={styles.stat}>📌 Goal: {goal}</Text>
          <Text style={styles.stat}>✅ Completed: {completed}</Text>
          <Text style={styles.stat}>📊 Balance: {goal - completed}</Text>

          <View style={styles.progressBarBackground}>
            <View
              style={[styles.progressBarFill, { width: `${progressPercent}%` }]}
            />
          </View>
          <Text style={styles.progressText}>{progressPercent.toFixed(0)}%</Text>
        </View>

        {/* Recent Swalath */}
        {history.length > 0 && (
          <View style={styles.historyBox}>
            <Text style={styles.historyTitle}>Recent Swalath:</Text>
            {history.slice(0, 5).map((item, index) => (
              <Text key={index} style={styles.historyText}>
                • {item.value} — {item.date}
              </Text>
            ))}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 15,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#1c1c1e",
    padding: 20,
    borderRadius: 12,
    width: "100%",
    marginVertical: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  stat: {
    color: "white",
    fontSize: 18,
    marginVertical: 2,
  },
  progressBarBackground: {
    width: "100%",
    height: 20,
    backgroundColor: "#333",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
  },
  progressBarFill: { height: "100%", backgroundColor: "#007bff" },
  progressText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    width: "100%",
    marginBottom: 15,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  historyBox: {
    backgroundColor: "#1c1c1e",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
  },
  historyTitle: { color: "white", fontWeight: "bold", marginBottom: 8 },
  historyText: { color: "#ccc", fontSize: 14 },
});
