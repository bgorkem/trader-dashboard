import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Stock, StockUpdate } from "../types/stock";

interface StocksState {
  stocks: Record<string, Stock>;
  loading: boolean;
  error: string | null;
}

const initialState: StocksState = {
  stocks: {},
  loading: false,
  error: null,
};

const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateStock: (state, action: PayloadAction<StockUpdate>) => {
      const { symbol, price, timestamp } = action.payload;
      const currentStock = state.stocks[symbol];

      if (currentStock) {
        const prevPrice = currentStock.price;
        const change = price - prevPrice;
        const percentChange = (change / prevPrice) * 100;

        state.stocks[symbol] = {
          ...currentStock,
          price,
          change,
          percentChange,
          lastUpdated: timestamp,
        };
      }
    },
    addStocks: (state, action: PayloadAction<Stock[]>) => {
      action.payload.forEach((stock) => {
        state.stocks[stock.symbol] = stock;
      });
    },
  },
});

export const { setLoading, setError, updateStock, addStocks } =
  stocksSlice.actions;
export default stocksSlice.reducer;
