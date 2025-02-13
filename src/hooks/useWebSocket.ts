import { useEffect } from "react";
import { websocketService } from "../services/websocket";

export const useWebSocket = (url: string) => {
  useEffect(() => {
    websocketService.connect(url);

    return () => {
      websocketService.disconnect();
    };
  }, [url]);

  return {
    isConnected: websocketService.isConnected(),
  };
};
