import { validateToken } from "../../lib/auth";
import { getStockDetails } from "../../lib/mutations";

const Playlist = ({ stockData }) => {
  return <div>Current Stock Price ${stockData.c}</div>;
};

export const getServerSideProps = async ({ query, req }) => {
  let user;

  try {
    user = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  // do the api call here
  const stockName = query?.id;

  if (!stockName || !user) {
    // no stock name, redirect back to home route
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const result = await getStockDetails({ stockName });

  const stockData = result?.response?.data;

  return {
    props: { stockData },
  };
};

export default Playlist;
