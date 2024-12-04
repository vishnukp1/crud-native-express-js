import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screen/HomeScreen";
import StockDetailsScreen from "./screen/StockDetailsScreen";


export type RootStackParamList = {
  Home: undefined;
  StockDetails: { stockId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => (

    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="StockDetails" component={StockDetailsScreen} />
    </Stack.Navigator>

);

export default App;

