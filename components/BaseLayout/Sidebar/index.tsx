import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Button,
  useMediaQuery,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  List,
  ListItem,
  LinkBox,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { MdSearch, MdInput } from "react-icons/md";
import { useRouter } from "next/router";
import { signout, getStockDetails } from "../../../lib/mutations";
import { User } from "../../types/types";

type Props = {
  user: User;
};

export const Sidebar: FC<Props> = ({ user }) => {
  const [isLessThan560] = useMediaQuery("(max-width: 560px)");
  const [isMobileView] = useMediaQuery("(max-width: 1000px)");
  const [userStockData, setUserStockData] = useState([]);
  const [hasRun, setHasRun] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const sidebarHeight = isLessThan560
    ? "calc(100vh - 65px)"
    : "calc(100vh - 80px)";

  const { firstName, lastName, userDetails } = user;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnClick = async () => {
    setIsLoading(true);
    await signout();
    setIsLoading(false);
    router.push("/signin");
    onClose();
  };

  const getStockData = async (stock: string) => {
    const result = await getStockDetails({ stockName: stock });

    setUserStockData((previousResults) => [
      ...previousResults,
      { name: stock, ...result?.response?.data },
    ]);
  };

  useEffect(() => {
    if (!hasRun && userDetails?.stockList?.length > 0) {
      userDetails?.stockList.forEach(async (stock: string) => {
        getStockData(stock);
      });
      setHasRun(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasRun, userDetails?.stockList]);

  const mobileView = (
    <>
      <Box position="absolute" top="120px" left="24px">
        <Button onClick={onOpen}>Open</Button>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent backgroundColor="gray.200">
          <DrawerHeader borderBottomWidth="1px">{`Hi ${firstName} ${lastName}`}</DrawerHeader>
          <DrawerBody>
            <Box>
              <InputGroup size="md">
                <InputLeftElement
                  pointerEvents="none"
                  // eslint-disable-next-line react/no-children-prop
                  children={<MdSearch color="gray.300" />}
                />
                <Input
                  backgroundColor="#FFFFFF"
                  placeholder={
                    isLessThan560 ? "Search Stock" : "Search Stock Code"
                  }
                />
              </InputGroup>
            </Box>
            <Box
              overflow="auto"
              maxHeight="85%"
              borderBottom="1px solid #032248"
              paddingBottom="12px"
            >
              <List spacing={2} marginTop="12px">
                {userStockData.map((stock) => (
                  <ListItem
                    key={`stock-list-sidebar-mobile-${stock.name}`}
                    onClick={onClose}
                  >
                    <LinkBox>
                      <NextLink
                        href={{
                          pathname: "/playlist/[id]",
                          query: { id: stock.name },
                        }}
                        passHref
                      >
                        <Card backgroundColor="#FFFFFF" size="sm">
                          <CardHeader>
                            <Heading size="sm">{stock.name}</Heading>
                          </CardHeader>
                          <CardBody>
                            <Text>${`${stock.c}`}</Text>
                          </CardBody>
                        </Card>
                      </NextLink>
                    </LinkBox>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Flex alignItems="center" justifyContent="center" paddingTop="24px">
              <Box width="100%">
                <Button
                  width="100%"
                  colorScheme="blue"
                  isLoading={isLoading}
                  onClick={handleOnClick}
                  size="md"
                  leftIcon={<MdInput />}
                >
                  Log Out
                </Button>
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );

  if (isMobileView) return mobileView;

  return (
    <Flex
      background="gray.200"
      width="350px"
      maxWidth="30%"
      height={sidebarHeight}
      // justifyContent="center"
      padding="12px"
      flexDirection="column"
    >
      <Box paddingBottom="24px" paddingTop="12px">
        <Heading size="md">{`Hi ${firstName} ${lastName}`}</Heading>
      </Box>

      <Box>
        <InputGroup size="md">
          <InputLeftElement
            pointerEvents="none"
            // eslint-disable-next-line react/no-children-prop
            children={<MdSearch color="gray.300" />}
          />
          <Input
            backgroundColor="#FFFFFF"
            placeholder={isLessThan560 ? "Search Stock" : "Search Stock Code"}
          />
        </InputGroup>
      </Box>

      <Box
        overflow="auto"
        maxHeight="85%"
        borderBottom="1px solid #032248"
        paddingBottom="12px"
      >
        <List spacing={2} marginTop="12px">
          {userStockData.map((stock) => (
            <ListItem key={`stock-list-sidebar-desktop-${stock.name}`}>
              <LinkBox>
                <NextLink
                  href={{
                    pathname: "/playlist/[id]",
                    query: { id: stock.name },
                  }}
                  passHref
                >
                  <Card size="sm" backgroundColor="#FFFFFF">
                    <CardHeader>
                      <Heading size="sm">{stock.name}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Flex width="100%">
                        <Text>Current</Text>
                        <Text color="green.600">$</Text>
                        <Text color="green.600">{`${stock.c}`}</Text>
                      </Flex>
                    </CardBody>
                  </Card>
                </NextLink>
              </LinkBox>
            </ListItem>
          ))}
        </List>
      </Box>
      <Flex alignItems="center" justifyContent="center" paddingTop="24px">
        <Box width="100%">
          <Button
            width="100%"
            colorScheme="blue"
            isLoading={isLoading}
            onClick={handleOnClick}
            size="md"
            leftIcon={<MdInput />}
          >
            Log Out
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};
