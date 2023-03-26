// app/src/services/oandaService.ts

import axios, { type AxiosInstance } from "axios";

interface AccountInfo {
  id: string;
  alias: string;
  currency: string;
  balance: string;
  createdTime: string;
  // Add more properties as needed
}

interface AccountInfoResponse {
  account: AccountInfo;
  lastTransactionID: string;
}

interface Candlestick {
  time: string;
  volume: number;
  // Add properties for bid, ask, and mid candlestick data as needed
}

interface HistoricalPriceData {
  instrument: string;
  granularity: string;
  candles: Candlestick[];
}

// Replace 'YOUR_API_KEY' with your actual OANDA API key
const OANDA_API_KEY = "YOUR_API_KEY";

// Use the appropriate base URL based on your account type (live or practice)
const OANDA_BASE_URL = "https://api-fxpractice.oanda.com";

const apiClient: AxiosInstance = axios.create({
  baseURL: OANDA_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OANDA_API_KEY}`,
  },
});

export const getAccountInfo = async (
  accountId: string
): Promise<AccountInfo> => {
  try {
    const response = await apiClient.get<AccountInfoResponse>(
      `/v3/accounts/${accountId}`
    );
    return response.data.account;
  } catch (error) {
    console.error(`Error fetching account info: ${String(error)}`);
    throw error;
  }
};

export const getHistoricalPriceData = async (
  instrument: string,
  granularity: string,
  count?: number
): Promise<HistoricalPriceData> => {
  try {
    const response = await apiClient.get<HistoricalPriceData>(
      "/v3/instruments/" + instrument + "/candles",
      {
        params: {
          granularity: granularity,
          count: count || 100,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching historical price data: ${String(error)}`);
    throw error;
  }
};

// Add more functions for other OANDA API calls as needed
