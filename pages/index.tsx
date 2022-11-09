// eslint-disable-next-line prettier/prettier
import prisma from "../lib/prisma";
import { TestComponent } from "../components/testComponent";
import { useMe } from "../lib/hooks";

const Home = ({ artists }) => {
  const { user } = useMe();
  // console.log("hello", artists);
  console.log("what is the user " + JSON.stringify(user));
  return <TestComponent data={artists} />;
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  };
};

export default Home;
