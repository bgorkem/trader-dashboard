import WebSocket from "ws";
import { generateMockStocks, updateStockPrices } from "./mockData";

const WS_PORT = 8080;
const UPDATE_INTERVAL = 1000; // 1 second

// Initialize WebSocket server
const wss = new WebSocket.Server({ port: WS_PORT });

// Generate initial mock data
let stocks = generateMockStocks(30); // Start with 30 stocks

console.log(`WebSocket server is running on ws://localhost:${WS_PORT}`);

wss.on("connection", (ws) => {
  console.log("Client connected");

  // Send initial stock data
  ws.send(JSON.stringify({ type: "INITIAL_DATA", stocks }));

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Regularly update and broadcast stock prices
setInterval(() => {
  stocks = updateStockPrices(stocks);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      const updates = stocks.map((stock) => ({
        symbol: stock.symbol,
        price: stock.price,
        timestamp: new Date().toISOString(),
      }));

      client.send(JSON.stringify({ type: "STOCK_UPDATE", updates }));
    }
  });
}, UPDATE_INTERVAL);
