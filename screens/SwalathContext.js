// screens/SwalathContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const SwalathContext = createContext();

export const SwalathProvider = ({ children }) => {
  const goal = 100000;
  const [completed, setCompleted] = useState(0);
  const [history, setHistory] = useState([]);
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

  const addToHistory = async (value) => {
    if (isNaN(value) || value <= 0) return;
    const date = new Date();
    const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const newHistory = [{ value, date: dateStr }, ...history];
    const newCompleted = completed + value;

    setHistory(newHistory);
    setCompleted(newCompleted <= goal ? newCompleted : goal);

    await AsyncStorage.setItem("completedSwalath", (newCompleted <= goal ? newCompleted : goal).toString());
    await AsyncStorage.setItem("swalathHistory", JSON.stringify(newHistory));
  };

  return (
    <SwalathContext.Provider value={{ completed, history, addToHistory, userName, setUserName, goal }}>
      {children}
    </SwalathContext.Provider>
  );
};
