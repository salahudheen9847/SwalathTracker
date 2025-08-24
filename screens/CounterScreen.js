import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CounterScreen({ navigation }) {
  const [count, setCount] = useState(0);

  // Load saved counter on start
  useEffect(() => {
    const loadCount = async () => {
      try {
        const saved = await AsyncStorage.getItem("counterValue");
        if (saved) setCount(parseInt(saved));
      } catch (e) {
        console.log("Error loading counter:", e);
      }
    };
    loadCount();
  }, []);

  // Save counter whenever it changes
  useEffect(() => {
    AsyncStorage.setItem("counterValue", count.toString());
  }, [count]);

  // Save to history (without resetting) & go Home
  const saveToHistory = async () => {
    if (count === 0) return;

    try {
      const newEntry = {
        id: Date.now().toString(),
        value: count,
        date: new Date().toLocaleString(),
      };

      const storedHistory = await AsyncStorage.getItem("history");
      const history = storedHistory ? JSON.parse(storedHistory) : [];
      history.push(newEntry);

      await AsyncStorage.setItem("history", JSON.stringify(history));

      if (navigation) {
        navigation.navigate("Home"); // go Home only
      }
    } catch (e) {
      console.log("Save error:", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Reset button stays at top right */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.smallReset}
          onPress={() => setCount(0)}
        >
          <Text style={styles.smallResetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>🌙 Swalath Counter</Text>
      <Text style={styles.counter}>{count}</Text>

      {/* Plus Button BIG */}
      <TouchableOpacity
        style={[styles.button, styles.bigAddBtn]}
        onPress={() => setCount(count + 1)}
      >
        <Text style={styles.bigAddText}>➕ Add</Text>
      </TouchableOpacity>

      {/* Home Button at bottom */}
      <View style={styles.bottomArea}>
        <TouchableOpacity
          style={[styles.homeBtn]}
          onPress={saveToHistory}
        >
          <Text style={styles.homeBtnText}>🏠 Home</Text>
        </TouchableOpacity>
      </View>
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
  topBar: {
    position: "absolute",
    top: 40,
    right: 20,
    flexDirection: "row",
  },
  smallReset: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "crimson",
  },
  smallResetText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  counter: {
    fontSize: 80, // Bigger counter value
    fontWeight: "bold",
    color: "#0f0",
    marginVertical: 40,
  },
  button: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  bigAddBtn: {
    backgroundColor: "#007bff",
    width: "85%",
    paddingVertical: 25, // Bigger button height
  },
  bigAddText: {
    color: "white",
    fontSize: 26, // Bigger text
    fontWeight: "bold",
  },
  bottomArea: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  homeBtn: {
    backgroundColor: "orange",
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 10,
  },
  homeBtnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
