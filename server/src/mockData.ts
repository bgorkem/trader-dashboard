import { Stock } from "../../src/types/stock";

const STOCK_SYMBOLS = [
  "AAPL",
  "GOOGL",
  "MSFT",
  "AMZN",
  "META",
  "TSLA",
  "NVDA",
  "NFLX",
  "AMD",
  "INTC",
  "IBM",
  "ORCL",
  "CRM",
  "ADBE",
  "CSCO",
  "PYPL",
  "SQ",
  "TWTR",
  "SNAP",
  "UBER",
  "LYFT",
  "SHOP",
  "ZM",
  "COIN",
  "RBLX",
  "PLTR",
  "SNOW",
  "NET",
  "DDOG",
  "CRWD",
];

export function generateMockStocks(count: number): Stock[] {
  return STOCK_SYMBOLS.slice(0, count).map((symbol) => ({
    symbol,
    price: generateRandomPrice(),
    change: 0,
    percentChange: 0,
    volume: Math.floor(Math.random() * 1000000),
    lastUpdated: new Date().toISOString(),
  }));
}

export function updateStockPrices(stocks: Stock[]): Stock[] {
  return stocks.map((stock) => {
    const previousPrice = stock.price;
    const newPrice = generatePriceUpdate(previousPrice);
    const change = newPrice - previousPrice;
    const percentChange = (change / previousPrice) * 100;

    return {
      ...stock,
      price: newPrice,
      change,
      percentChange,
      volume: stock.volume + Math.floor(Math.random() * 10000),
      lastUpdated: new Date().toISOString(),
    };
  });
}

function generateRandomPrice(): number {
  return Math.random() * 1000 + 10; // Random price between 10 and 1010
}

function generatePriceUpdate(currentPrice: number): number {
  const maxChange = currentPrice * 0.02; // Maximum 2% change
  const change = (Math.random() - 0.5) * maxChange;
  return Math.max(0.01, currentPrice + change); // Ensure price doesn't go below 0.01
}
