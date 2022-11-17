import { validateRoute } from "../../lib/auth";
import prisma from "../../lib/prisma";

// use this call to get any required details for a user.
export default validateRoute(async (req, res, user) => {
  const playListsCount = await prisma.playlist.count({
    where: { userId: user.id },
  });

  const userDetails = await prisma.userDetails.findUnique({
    where: { userId: user.id },
    select: { stockList: true, favouriteStock: true },
  });
  res.json({ ...user, playListsCount, userDetails });
  // @todo do I need the below?
  res.end();
});
