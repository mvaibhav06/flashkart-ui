import React, { useEffect, useState } from "react";
import axios from "axios"; // Imported to help with type-checking the error
import { getProducts, createOrder } from "./apiService";
import type { Product } from "./apiService"; // Fix 1: Added 'type' keyword here

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const loadData = () => {
    getProducts().then((res) => setProducts(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePurchase = async (p: Product) => {
    try {
      await createOrder(p.id);
      setLogs((prev) => [
        `Ordered 1x ${p.name} at ${new Date().toLocaleTimeString()}`,
        ...prev,
      ]);
      loadData(); // Refresh stock levels immediately
    } catch (err: unknown) {
      // Fix 2: Changed 'any' to 'unknown'

      // We safely check if the error came from our Axios HTTP request
      let errorMsg = "Transaction Failed";
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        errorMsg = err.response.data.error;
      } else if (err instanceof Error) {
        errorMsg = err.message;
      }

      setLogs((prev) => [`❌ ERROR: ${errorMsg}`, ...prev]);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
        backgroundColor: "#f4f7f6",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#2c3e50" }}>⚡ Flashkart Inventory Ledger</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Product Grid */}
        <div
          style={{
            flex: 2,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{p.name}</h3>
              <p style={{ color: "#7f8c8d" }}>SKU: {p.sku}</p>
              <h2 style={{ color: "#27ae60" }}>${p.price}</h2>
              <p>
                <strong>Stock Remaining: {p.stockQuantity}</strong>
              </p>
              <button
                disabled={p.stockQuantity <= 0}
                onClick={() => handlePurchase(p)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: p.stockQuantity > 0 ? "#3498db" : "#bdc3c7",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {p.stockQuantity > 0 ? "PURCHASE NOW" : "OUT OF STOCK"}
              </button>
            </div>
          ))}
        </div>

        {/* Transaction Log */}
        <div
          style={{
            flex: 1,
            background: "#2c3e50",
            color: "#ecf0f1",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>Transaction History</h3>
          <div style={{ fontSize: "14px" }}>
            {logs.map((log, i) => (
              <p
                key={i}
                style={{
                  borderBottom: "1px solid #34495e",
                  paddingBottom: "5px",
                }}
              >
                {log}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
