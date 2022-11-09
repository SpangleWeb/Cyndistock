import React, { FC, useState } from "react";
import { Box, Flex, Input, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextImage from "next/image";
import { auth } from "../lib/mutations";

const AuthForm: FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formattedModeString = mode === "signin" ? "Log in" : "Sign up";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await auth(mode, { email, password });
    setIsLoading(false);
    router.push("/");
  };

  return (
    <Box
      height="100vh"
      width="100vw"
      // bgGradient="linear(to-l, #2998ff, #5643fa)"
      color="white"
    >
      <Flex
        justify="center"
        align="center"
        // height="100px"
        // borderBottom="1px solid white"
        flexDirection="row"
      >
        {/* <NextImage src="/logo.svg" alt="site logo" width={120} height={60} /> */}
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box
          padding="50px"
          bg="white"
          borderRadius="6px"
          width="400px"
          maxWidth="calc(100vw - 48px)"
          borderTop=" 8px solid #5643fa"
          boxShadow="0px 3px 9px rgba(0, 0, 0, 0.4)"
        >
          <Text
            color="gray.800"
            textAlign="center"
            mb="24px"
            fontSize="3xl"
            fontWeight="700"
          >
            Welcome to CyndiStock
          </Text>
          <form onSubmit={handleSubmit}>
            <Box paddingBottom="24px">
              <Text color="gray.800" fontWeight="600">
                Email
              </Text>
              <Input
                placeholder="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                borderColor="gray.900"
                color="gray.900"
              />
            </Box>
            <Box paddingBottom="24px">
              <Text color="gray.800" fontWeight="600">
                Password
              </Text>
              <Input
                placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                borderColor="gray.900"
                color="gray.900"
              />
            </Box>
            <Box width="100%" paddingBottom="24px">
              <Button
                type="submit"
                bg="#5643fa"
                isLoading={isLoading}
                size="md"
                width="100%"
                sx={{
                  "&:hover": {
                    bg: " #2998ff",
                  },
                }}
              >
                {formattedModeString}
              </Button>
            </Box>
            <Box width="100%" paddingBottom="24px">
              <Button color="#5643fa" size="md" width="100%" variant="link">
                Forgot Password?
              </Button>
            </Box>
            <Box width="100%">
              <Button color="#5643fa" size="md" width="100%" variant="link">
                Register
              </Button>
            </Box>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
