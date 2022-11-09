import React, { useState } from "react";
import NextImage from "next/image";
import NextLink from "next/link";
import { Box, Flex, List, ListItem, Divider } from "@chakra-ui/layout";
import { LinkBox, ListIcon, Text, Button } from "@chakra-ui/react";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";
import { useRouter } from "next/router";
import { usePlaylist } from "../lib/hooks";
import { signout } from "../lib/mutations";

const navMenu = [
  { name: "Home", icon: MdHome, route: "/" },
  { name: "Search", icon: MdSearch, route: "/search" },
  { name: "Your Library", icon: MdLibraryMusic, route: "/library" },
];

const musicMenu = [
  { name: "Create Playlist", icon: MdPlaylistAdd, route: "/" },
  { name: "Favorites", icon: MdFavorite, route: "/favorites" },
];

const Sidebar = () => {
  const { playlists } = usePlaylist();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    setIsLoading(true);
    await signout();
    setIsLoading(false);
    router.push("/signin");
  };

  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      px="12px"
      color="gray"
    >
      <Box py="24px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="12px">
          <NextImage src="/logo.svg" alt="trax logo" height={60} width="120" />
        </Box>
        <Box marginBottom="24px">
          <Button
            colorScheme="blue"
            isLoading={isLoading}
            onClick={handleOnClick}
          >
            Button
          </Button>
          <List spacing={2.4}>
            {navMenu.map((menu) => (
              <ListItem
                paddingX="24px"
                paddingY="3px"
                fontSize="16px"
                key={menu.name}
              >
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <Flex alignItems="center">
                      <ListIcon
                        as={menu.icon}
                        color="white"
                        marginRight="12px"
                      />
                      <Text color="white">{menu.name}</Text>
                    </Flex>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <List spacing={2} marginTop="24px">
            {musicMenu.map((item) => (
              <ListItem
                paddingX="24px"
                paddingY="3px"
                fontSize="16px"
                key={item.name}
              >
                <LinkBox>
                  <NextLink href={item.route} passHref>
                    <Flex alignItems="center">
                      <ListIcon
                        as={item.icon}
                        color="white"
                        marginRight="12px"
                      />
                      <Text color="white">{item.name}</Text>
                    </Flex>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider marginY="24px" color="grey.800" />
        <Box height="75%" overflowY="auto" paddingBottom="24px">
          <List spacing={2}>
            {playlists.map((playlist) => (
              <ListItem
                paddingX="24px"
                paddingY="3px"
                fontSize="16px"
                key={playlist.id}
              >
                <LinkBox>
                  <NextLink
                    href={{
                      pathname: "/playlist/[id]",
                      query: { id: playlist.id },
                    }}
                    passHref
                  >
                    <Flex alignItems="center">
                      <Text color="white">{playlist.name}</Text>
                    </Flex>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
