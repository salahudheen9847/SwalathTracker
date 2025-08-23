import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    (async () => {
      const savedCompleted = await AsyncStorage.getItem("completedSwalath");
      const savedHistory = await AsyncStorage.getItem("swalathHistory");
      const savedUser = await AsyncStorage.getItem("userName");

      if (savedCompleted) setCompleted(parseInt(savedCompleted));
      if (savedHistory) setHistory(JSON.parse(savedHistory));
      if (savedUser) setUserName(savedUser);
    })();
  }, []);

  const shareHistory = async () => {
    if (history.length === 0) return;

    const text =
      `🌙 Swalath Tracker\n👤 Name: ${userName || "Unknown"}\n\n✅ Total Completed: ${completed}\n\n📖 History:\n` +
      history.map((item) => `• ${item.value} — ${item.date}`).join("\n");

    try {
      await Share.share({ message: text });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📖 Swalath History</Text>

      <TouchableOpacity style={styles.shareButton} onPress={shareHistory}>
        <Text style={styles.shareText}>📤 Share</Text>
      </TouchableOpacity>

      {history.length === 0 ? (
        <Text style={styles.noHistory}>No history found</Text>
      ) : (
        <FlatList
          data={history}
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
  title: { fontSize: 24, fontWeight: "bold", color: "white", marginBottom: 15, textAlign: "center" },
  shareButton: { backgroundColor: "#007bff", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 15 },
  shareText: { color: "white", fontSize: 16, fontWeight: "bold" },
  noHistory: { color: "#aaa", fontSize: 16, textAlign: "center", marginTop: 20 },
  historyItem: { backgroundColor: "#1c1c1e", padding: 12, borderRadius: 8, marginBottom: 10 },
  historyText: { color: "white", fontSize: 16 },
});
