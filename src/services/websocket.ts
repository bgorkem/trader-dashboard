import { store } from "../store";
import { setError, updateStock, addStocks } from "../store/stocksSlice";
import { StockUpdate } from "../types/stock";

type ConnectionChangeCallback = (connected: boolean) => void;

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;
  private readonly reconnectDelay = 3000; // 3 seconds
  private connectionListeners: Set<ConnectionChangeCallback> = new Set();

  connect(url: string): void {
    try {
      this.ws = new WebSocket(url);
      this.setupEventHandlers();
    } catch (error) {
      console.error("WebSocket connection error:", error);
      store.dispatch(setError("Failed to connect to WebSocket server"));
      this.notifyConnectionChange(false);
    }
  }

  private setupEventHandlers(): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      console.log("WebSocket connection established");
      this.reconnectAttempts = 0;
      this.notifyConnectionChange(true);
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "INITIAL_DATA") {
          store.dispatch(addStocks(data.stocks));
        } else if (data.type === "STOCK_UPDATE") {
          data.updates.forEach((update: StockUpdate) => {
            store.dispatch(updateStock(update));
          });
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    this.ws.onclose = () => {
      console.log("WebSocket connection closed");
      this.notifyConnectionChange(false);
      this.attemptReconnect();
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      store.dispatch(setError("WebSocket connection error"));
      this.notifyConnectionChange(false);
    };
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      store.dispatch(setError("Maximum reconnection attempts reached"));
      return;
    }

    this.reconnectAttempts++;
    console.log(
      `Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
    );

    setTimeout(() => {
      this.connect(this.ws?.url ?? "");
    }, this.reconnectDelay);
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.notifyConnectionChange(false);
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  onConnectionChange(callback: ConnectionChangeCallback): void {
    this.connectionListeners.add(callback);
  }

  offConnectionChange(callback: ConnectionChangeCallback): void {
    this.connectionListeners.delete(callback);
  }

  private notifyConnectionChange(connected: boolean): void {
    this.connectionListeners.forEach((listener) => listener(connected));
  }
}

// Create a singleton instance
export const websocketService = new WebSocketService();
