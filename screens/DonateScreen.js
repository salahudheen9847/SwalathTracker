import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DonateScreen() {
  const phoneNumber = "+919745525150";

  const handleDonate = async () => {
    Alert.alert("Donation Info", "Please use the number: " + phoneNumber);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❤️ Support Swalath Tracker</Text>
      <Text style={styles.subtitle}>Donate via Google Pay / PhonePe / Paytm</Text>
      <Text style={styles.text}>📱 Phone: {phoneNumber}</Text>

      <TouchableOpacity style={styles.button} onPress={handleDonate}>
        <Text style={styles.buttonText}>💰 Donate Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "black",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, color: "white" },
  subtitle: { fontSize: 16, marginBottom: 20, color: "#ccc" },
  text: { fontSize: 18, marginVertical: 5, color: "white" },
  button: {
    backgroundColor: "crimson",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: { fontSize: 18, color: "white", fontWeight: "bold" },
});
