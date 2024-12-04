import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createStock, getStockById, updateStock } from "../services/api";
import { Stock } from "../types/Stock";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../app/index";

type StockDetailsRouteProp = RouteProp<RootStackParamList, "StockDetails">;

const StockDetailsScreen: React.FC <any>= ({navigation}) => {
  const route = useRoute<StockDetailsRouteProp>();
  const { stockId } = route.params;

  const [form, setForm] = useState<Omit<Stock, "_id">>({
    name: "",
    price: 0,
    category: "",
  });

  useEffect(() => {
    if (stockId) {
      const fetchStock = async () => {
        const stock = await getStockById(stockId);
        setForm(stock);
      };
      fetchStock();
    }
  }, [stockId]);

  const handleSave = async () => {
    try {
      if (stockId) {
        await updateStock(stockId, form);
        Alert.alert("Success", "Stock updated successfully!");
      } else {
        await createStock(form);
        Alert.alert("Success", "Stock created successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />
      <Text>Price:</Text>
      <TextInput
        style={styles.input}
        value={form.price.toString()}
        keyboardType="numeric"
        onChangeText={(text) => setForm({ ...form, price: parseFloat(text) })}
      />
      <Text>Category:</Text>
      <TextInput
        style={styles.input}
        value={form.category}
        onChangeText={(text) => setForm({ ...form, category: text })}
      />
      <Button title="Save" onPress={handleSave} />
      <Button
        title="Go to Cart"
        onPress={() => navigation.navigate('Home')}  
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    padding: 8,
  },
});

export default StockDetailsScreen;
