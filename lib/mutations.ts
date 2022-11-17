import axios from "axios";
import { subMonths } from 'date-fns';
import fetcher from "./fetcher";

export const auth = (
  mode: "signin" | "signup",
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, body);
};

export const signout = () => {
  return fetcher(`/signout`);
};

export const signinAuth = (body: { email: string; password: string }) => {
  return fetcher(`/signin`, body);
};

export const signupAuth = (body: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  return fetcher(`/signup`, body);
};

export const getStockDetails = async (body: { stockName: string }) => {
  const finhubRequestKey = process.env.NEXT_PUBLIC_FINHUB_API_KEY;

  const response = await axios.get(
    `https://finnhub.io/api/v1/quote?symbol=${body.stockName}&token=${finhubRequestKey}`
  );

  return { response };
};

export const getStockCandles = async (body: { stockName: string }) => {
  const finhubRequestKey = process.env.NEXT_PUBLIC_FINHUB_API_KEY;

  const now = new Date();
  const oneYearAgo = subMonths(now, 12);

  const nowU = Math.floor(now.getTime() / 1000);
  const yearU = Math.floor(oneYearAgo.getTime() / 1000);

  const res = await fetch(
    `https://finnhub.io/api/v1/stock/candle?symbol=${body.stockName}&resolution=W&from=${yearU}&to=${nowU}&token=${finhubRequestKey}`
  );
  // const data = await res.text();
  const data = await res.json();

  return { data };
};
