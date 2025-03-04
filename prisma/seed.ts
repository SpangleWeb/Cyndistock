import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { artistsData } from "./songsData";

const prisma = new PrismaClient();

const run = async () => {
  await Promise.all(
    artistsData.map(async (artists) => {
      return prisma.artist.upsert({
        where: { name: artists.name },
        update: {},
        create: {
          name: artists.name,
          songs: {
            create: artists.songs.map((song) => ({
              name: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      });
    })
  );

  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: 'mitch@test.com'},
    update: {},
    create: {
      email: 'mitch@test.com',
      password: bcrypt.hashSync('Password123!', salt),
      isAdmin: true,
      firstName: 'Mitch',
      lastName: "CoolKid",
    },
  });

  await prisma.userDetails.create({
    data: {
      stockList: [
        "AAPL",
        "MSFT",
        "TSLA",
        "META",
        "BABA",
        "UBER",
        "DIS",
        "SBUX",
      ],
      favouriteStock: "TSLA",
      user: {
        connect: { id: user.id },
      },
    },
  });

  await prisma.cyndiGroup.create({
    data: {
      name: "Look Mum No Hands",
      watchList: ["META", "UBER", "TSLA"],
      users: {
        connect: [{ id: user.id }],
      },
    },
  });

  const songs = await prisma.song.findMany({});

  await Promise.all(
    new Array(10).fill(1).map(async (_, i) => {
      return prisma.playlist.create({
        data: {
          name: `Playlist #${i + 1}`,
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: songs.map((song) => ({
              id: song.id,
            })),
          },
        },
      });
    })
  );
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
