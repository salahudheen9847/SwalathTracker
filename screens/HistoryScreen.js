import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [userName, setUserName] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        try {
          const savedHistory = await AsyncStorage.getItem("swalathHistory");
          const savedUser = await AsyncStorage.getItem("userName");
          const parsedHistory = savedHistory ? JSON.parse(savedHistory) : [];

          // Sort by id descending → latest entry first
          const sortedHistory = parsedHistory.sort(
            (a, b) => Number(b.id) - Number(a.id)
          );

          setHistory(sortedHistory);
          setUserName(savedUser || "");

          // calculate total from history
          const total = parsedHistory.reduce((sum, item) => sum + item.value, 0);
          setCompleted(total);
        } catch (e) {
          console.log("Error loading history", e);
        }
      })();
    }, [])
  );

  const shareHistory = async () => {
    if (history.length === 0) return;

    const text =
      `🌙 Swalath Tracker\n👤 Name: ${userName || "Unknown"}\n\n✅ Total Completed: ${completed}\n\n📖 History:\n` +
      history.map((item) => `• ${item.value} — ${item.date}`).join("\n");

    try {
      await Share.share({ message: text });
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📖 Swalath History</Text>

      {/* Total Count */}
      <Text style={styles.totalText}>✅ Total: {completed}</Text>

      <TouchableOpacity style={styles.shareButton} onPress={shareHistory}>
        <Text style={styles.shareText}>📤 Share</Text>
      </TouchableOpacity>

      {history.length === 0 ? (
        <Text style={styles.noHistory}>No history found</Text>
      ) : (
        <FlatList
          data={history} // already sorted latest first
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.historyText}>
                • {item.value} — {item.date}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f0",
    marginBottom: 10,
    textAlign: "center",
  },
  shareButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  shareText: { color: "white", fontSize: 16, fontWeight: "bold" },
  noHistory: {
    color: "#aaa",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  historyItem: {
    backgroundColor: "#1c1c1e",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  historyText: { color: "white", fontSize: 16 },
});
