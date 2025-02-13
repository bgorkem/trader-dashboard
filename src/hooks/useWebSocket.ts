import { useEffect, useState } from "react";
import { websocketService } from "../services/websocket";

export const useWebSocket = (url: string) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleConnectionChange = (connected: boolean) => {
      setIsConnected(connected);
    };

    // Subscribe to connection status changes
    websocketService.onConnectionChange(handleConnectionChange);
    websocketService.connect(url);

    return () => {
      websocketService.disconnect();
      websocketService.offConnectionChange(handleConnectionChange);
    };
  }, [url]);

  return {
    isConnected,
  };
};
