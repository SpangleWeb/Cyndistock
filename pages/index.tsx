import React from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Card,
  Button,
  Flex,
  Heading,
  Text,
  Spacer,
  useMediaQuery,
  SlideFade,
} from "@chakra-ui/react";
import { Navbar } from "../components/BaseLayout/Navbar";

// This is the home screen body content
const Home = () => {
  const [isLessThan560] = useMediaQuery("(max-width: 560px)");

  return (
    <Flex
      backgroundRepeat="no-repeat"
      width="100vw"
      height="100vh"
      backgroundImage="linear-gradient(
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.6)
      ),
      url(/background.jpg);
      "
      backgroundPosition="center"
      backgroundSize="cover"
      flexDirection="column"
      overflow="auto"
    >
      <Navbar />
      <Flex
        minH={isLessThan560 ? "calc(100vh - 65px)" : "calc(100vh - 80px)"}
        height={isLessThan560 ? "calc(100vh - 65px)" : "calc(100vh - 80px)"}
        justifyContent="center"
        alignItems="center"
        marginTop={isLessThan560 ? "65px" : "80px"}
      >
        <Flex flexDirection="column">
          <Heading
            as="h1"
            size="4xl"
            noOfLines={2}
            color="white"
            textAlign="center"
            padding="24px"
          >
            Welcome to CyndiStock
          </Heading>
          <Heading
            as="h2"
            size="xl"
            noOfLines={2}
            color="white"
            textAlign="center"
            padding="24px"
          >
            Compete with your team mates, profit together.
          </Heading>

          <SlideFade offsetY="50px" in>
            <Flex
              marginLeft="auto"
              marginRight="auto"
              justifyContent="center"
              alignItems="center"
              padding="24px"
            >
              <Button colorScheme="teal" size="lg">
                Create Account
              </Button>
            </Flex>
          </SlideFade>
        </Flex>
      </Flex>
      <Flex
        minH={isLessThan560 ? "calc(100vh - 65px)" : "calc(100vh - 80px)"}
        height={isLessThan560 ? "calc(100vh - 65px)" : "calc(100vh - 80px)"}
        justifyContent="center"
        alignItems="center"
        backgroundColor="white"
        flexDirection="column"
        backgroundImage="linear-gradient(
          rgba(255, 255, 255, 0.9),
          rgba(255, 255, 255, 0.9)
        ),
        url(/stocks_background.png)"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="top"
      >
        <Heading
          as="h2"
          size="3xl"
          noOfLines={2}
          textAlign="center"
          padding="24px"
        >
          Claim the team cyndi shark title
        </Heading>
        <Card
          width="1200px"
          padding="24px"
          maxWidth="calc(100% - 48px)"
          marginTop="24px"
          border="1px solid #0D0630"
        >
          <Heading
            as="h3"
            size="2xl"
            noOfLines={2}
            textAlign="center"
            padding="24px"
          >
            Team Rankings
          </Heading>
          <Card
            width="100%"
            padding="12px"
            backgroundColor="white"
            border="1px solid #AAFAC8"
          >
            <Flex>
              <Avatar
                size="md"
                name="Christian Nwamba"
                src="https://bit.ly/ryan-florence"
              >
                <AvatarBadge boxSize="24px" bg="green.500" />
              </Avatar>
            </Flex>
          </Card>
          <Card
            width="100%"
            padding="12px"
            my="24px"
            backgroundColor="white"
            border="1px solid #AAFAC8"
          >
            <Flex>
              <Avatar
                size="md"
                name="Christian Nwamba"
                src="https://bit.ly/code-beast"
              >
                <AvatarBadge boxSize="24px" bg="green.500" />
              </Avatar>
            </Flex>
          </Card>
          <Card
            width="100%"
            padding="12px"
            backgroundColor="white"
            border="1px solid #AAFAC8"
          >
            <Flex>
              <Avatar
                size="md"
                name="Christian Nwamba"
                src="https://bit.ly/sage-adebayo"
              >
                <AvatarBadge boxSize="24px" bg="red.500" />
              </Avatar>
            </Flex>
          </Card>
        </Card>
      </Flex>
    </Flex>
  );
};

Home.homePage = true;

export default Home;

/**
 * 
 * 
 * backgroundImage="linear-gradient(to right bottom,
        rgba(86, 67, 250, 0.8),
        rgba(86, 67, 250, 0.7),
        rgba(86, 67, 250, 0.6),
        rgba(0, 159, 183, 0.6),
        rgba(255, 255, 255, 0.1)
      ),
      url(/background.jpg);
      "
 */
