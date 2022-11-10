import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";
import NextImage from "next/image";
import { SigninForm } from "./SigninForm";
import { SignupForm } from "./SignupForm";

const AuthForm: FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const isSigninForm = mode === "signin";

  return (
    <Flex
      height="100vh"
      width="100vw"
      // bgGradient="linear(to-l, #2998ff, #5643fa)"
      color="white"
      justifyContent="center"
      alignItems="center"
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
          <Flex
            justify="center"
            align="center"
            // height="100px"
            // borderBottom="1px solid white"
            flexDirection="row"
            marginTop="-48px"
          >
            <NextImage
              src="/cyndi_dark_logo.svg"
              alt="site logo"
              width={200}
              height={200}
            />
          </Flex>
          {isSigninForm ? <SigninForm /> : <SignupForm />}
        </Box>
      </Flex>
    </Flex>
  );
};

export default AuthForm;
