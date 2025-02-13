import { FC } from "react";
import { useWebSocket } from "./hooks/useWebSocket";
import StockList from "./components/StockList/StockList";
import "./App.css";

const WEBSOCKET_URL = "ws://localhost:8080"; // We'll create this server next

const App: FC = () => {
  const { isConnected } = useWebSocket(WEBSOCKET_URL);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Stock Dashboard</h1>
        <div className="connection-status">
          Status: {isConnected ? "Connected" : "Disconnected"}
        </div>
      </header>
      <main className="app-main">
        <StockList />
      </main>
    </div>
  );
};

export default App;
