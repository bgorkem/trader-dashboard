export interface Stock {
  symbol: string;
  price: number;
  change: number;
  percentChange: number;
  volume: number;
  lastUpdated: string;
}

export interface StockUpdate {
  symbol: string;
  price: number;
  timestamp: string;
}
