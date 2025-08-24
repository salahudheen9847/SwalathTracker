import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";

export default function CounterScreen() {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🔢 Counter</Text>

      <Text style={styles.counter}>{count}</Text>

      {/* Plus Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#007bff" }]}
        onPress={() => setCount(count + 1)}
      >
        <Text style={styles.buttonText}>➕ Add</Text>
      </TouchableOpacity>

      {/* Reset Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "crimson" }]}
        onPress={() => setCount(0)}
      >
        <Text style={styles.buttonText}>🔄 Reset</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  counter: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 30,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    marginVertical: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
