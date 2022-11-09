import prisma from "../../lib/prisma";
import { validateToken } from "../../lib/auth";

const Playlist = ({ playlist }) => {
  return <div>playlist cool banana {playlist.name}</div>;
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

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return {
    props: { playlist },
  };
};

export default Playlist;
