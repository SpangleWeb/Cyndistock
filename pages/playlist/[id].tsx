import { Box } from "@chakra-ui/react";
import { validateToken } from "../../lib/auth";
import { getStockCandles } from "../../lib/mutations";
import { StockCandleChart } from "../../components/StockCandleChart";

const Playlist = ({ stockCandle, stockName }) => {
  return (
    <Box>
      <StockCandleChart candleData={stockCandle} stockName={stockName} />
    </Box>
  );
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

  const stockCandle = await getStockCandles({ stockName });

  return {
    props: { stockCandle, stockName },
  };
};

export default Playlist;
