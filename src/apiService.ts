import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export interface Product {
  id: number;
  sku: string;
  name: string;
  price: number;
  stockQuantity: number;
}

export const getProducts = () =>
  axios.get<Product[]>(`${API_BASE_URL}/products`);
export const createOrder = (productId: number) =>
  axios.post(`${API_BASE_URL}/orders`, {
    items: [{ productId, quantity: 1 }],
  });
