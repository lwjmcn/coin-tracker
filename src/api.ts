import axios from "axios";

const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  const response = await axios(`${BASE_URL}/coins`);
  return response.data.slice(0,100);
}
export async function fetchCoinInfo(coinId:string) {
  const response = await axios(`${BASE_URL}/coins/${coinId}`);
  return response.data;
}
export async function fetchCoinTickers(coinId:string) {
  const response = await axios(`${BASE_URL}/tickers/${coinId}`);
  return response.data;
}
export async function fetchCoinHistory(coinId:string) {
  // const endDate = Math.floor(Date.now()/1000);
  // const startDate = endDate - 60*60*24*7*2;
  const response = await axios(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`);
  return response.data;
}