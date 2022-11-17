import axios from "axios";
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
