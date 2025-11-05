import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FlatList, View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import { Card, Appbar, Button } from "react-native-paper";

const API = "http://localhost:3000/api/coffee"; // use your local IP if testing on phone

export default function App() {
  const [menu, setMenu] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCat, setSelectedCat] = useState("All");
  const [loading, setLoading] = useState(true);
  const [surprise, setSurprise] = useState<any | null>(null);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      const data = Array.isArray(res.data) ? res.data : [];
      setMenu(data);
      setCategories(["All", ...new Set(data.map((i) => i.category))]);
    } catch {
      Alert.alert("Error", "Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  const getSurprise = async () => {
    try {
      const res = await axios.get(`${API}/surprise`);
      setSurprise(res.data);
    } catch {
      Alert.alert("Error", "Failed to load surprise item");
    }
  };

  useEffect(() => { fetchMenu(); }, []);

  const filtered =
    selectedCat === "All" ? menu : menu.filter((i) => i.category === selectedCat);

  if (loading)
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f1724" }}>
          <ActivityIndicator size="large" color="#06b6d4" />
          <Text style={{ color: "#fff", marginTop: 8 }}>Loading Coffee Menu...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0f1724" }}>
        <Appbar.Header style={{ backgroundColor: "#1e293b" }}>
          <Appbar.Content title="☕ CoffeeApp Menu" color="#fff" />
          <Appbar.Action icon="refresh" onPress={fetchMenu} color="#fff" />
        </Appbar.Header>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          style={{ padding: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedCat(item)}
              style={{
                backgroundColor: selectedCat === item ? "#06b6d4" : "#1e293b",
                padding: 10,
                borderRadius: 20,
                marginRight: 10,
              }}>
              <Text style={{ color: "#fff" }}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />

        <FlatList
          data={filtered}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Card style={{ margin: 10, backgroundColor: "#1e293b" }}>
              <Card.Content>
                <Text style={{ color: "#fff", fontSize: 18 }}>{item.name}</Text>
                <Text style={{ color: "#9ca3af" }}>{item.category}</Text>
                <Text style={{ color: "#06b6d4", fontSize: 16 }}>${item.price}</Text>
                <Text style={{ color: "#cbd5e1", marginTop: 5 }}>{item.description}</Text>
              </Card.Content>
            </Card>
          )}
        />

        <View style={{ padding: 10 }}>
          <Button mode="contained" onPress={getSurprise} style={{ backgroundColor: "#06b6d4" }}>
            🎁 Surprise Me
          </Button>

          {surprise && (
            <Card style={{ marginTop: 15, backgroundColor: "#1e293b" }}>
              <Card.Content>
                <Text style={{ color: "#fff", fontSize: 18 }}>{surprise.name}</Text>
                <Text style={{ color: "#9ca3af" }}>{surprise.category}</Text>
                <Text style={{ color: "#06b6d4" }}>${surprise.price}</Text>
                <Text style={{ color: "#cbd5e1", marginTop: 5 }}>{surprise.description}</Text>
              </Card.Content>
            </Card>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
