import axios from "axios";
import { Stock } from "../types/Stock";

const api = axios.create({
  baseURL: "http://localhost:5000", 
});

export const getStocks = async (): Promise<Stock[]> => {
  const response = await api.get("/stock");
  return response.data.data;
};

export const getStockById = async (id: string): Promise<Stock> => {
  const response = await api.get(`/stock/${id}`);
  return response.data.data;
};

export const createStock = async (data: Omit<Stock, "_id">): Promise<Stock> => {
  const response = await api.post("/stock", data);
  return response.data.data;
};

export const updateStock = async (
  id: string,
  data: Partial<Stock>
): Promise<Stock> => {
  const response = await api.put(`/stock/${id}`, data);
  return response.data.data;
};

export const deleteStock = async (id: string): Promise<void> => {
  await api.delete(`/stock/${id}`);
};
