import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { Stock } from "../types/Stock";
import { getStocks, deleteStock } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../app/index";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const navigation = useNavigation<NavigationProp>();

  const fetchStocks = async () => {
    try {
      const data = await getStocks();
      setStocks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStock(id);
      Alert.alert("Success", "Stock deleted successfully!");
      fetchStocks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={stocks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.stockItem}>
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
            <Text>Category: {item.category}</Text>
            <Button
              title="View"
              onPress={() => navigation.navigate("StockDetails", { stockId: item._id })}
            />
            <Button title="Delete" onPress={() => handleDelete(item._id)} />
          </View>
        )}
      />
      <Button title="Add New Stock" onPress={() => navigation.navigate("StockDetails", { stockId: "" })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  stockItem: {
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});

export default HomeScreen;
