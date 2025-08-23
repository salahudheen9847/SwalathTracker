import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
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

  useEffect(() => {
    (async () => {
      const savedCompleted = await AsyncStorage.getItem("completedSwalath");
      const savedHistory = await AsyncStorage.getItem("swalathHistory");
      if (savedCompleted) setCompleted(parseInt(savedCompleted));
      if (savedHistory) setHistory(JSON.parse(savedHistory));
    })();
  }, []);

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌙 Swalath Tracker</Text>
      <Text style={styles.subtitle}>(1 Lakh Cycle)</Text>

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

      <TextInput
        placeholder="Enter Swalath"
        keyboardType="numeric"
        value={input}
        onChangeText={setInput}
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={addSwalath}>
        <Text style={styles.buttonText}>➕ Add Swalath</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("History")}
      >
        <Text style={styles.secondaryButtonText}>📖 View History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("Login", { setUserName })}
      >
        <Text style={styles.secondaryButtonText}>🔑 Login / Backup</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.donateButton}
        onPress={() => navigation.navigate("Donate")}
      >
        <Text style={styles.buttonText}>❤️ Donate</Text>
      </TouchableOpacity>

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
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "black", // Dark background
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#1c1c1e",
    padding: 20,
    borderRadius: 12,
    width: "100%",
    marginBottom: 20,
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
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  secondaryButton: {
    backgroundColor: "#2c2c2e",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  secondaryButtonText: { color: "white", fontSize: 16 },
  donateButton: {
    backgroundColor: "crimson",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  historyBox: {
    backgroundColor: "#1c1c1e",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
  },
  historyTitle: { color: "white", fontWeight: "bold", marginBottom: 8 },
  historyText: { color: "#ccc", fontSize: 14 },
});
