import React, { FC } from "react";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import NextImage from "next/image";
import { User } from "../../types/types";

type Props = {
  user?: User;
};

export const Navbar: FC<Props> = () => {
  const [isLessThan560] = useMediaQuery("(max-width: 560px)");

  const defaultPageMargin = "48px";
  const mobilePageMargin = "12px";

  return (
    <Flex
      bgColor="white"
      width="100vw"
      height={isLessThan560 ? "65px" : "80px"}
      justifyContent="space-between"
      alignItems="center"
      boxShadow="0 1px 3px rgba(0,0,0,0.3)"
      paddingX={isLessThan560 ? mobilePageMargin : defaultPageMargin}
      flexDirection="row"
      zIndex={2}
      position="fixed"
      top="0"
    >
      <Box marginLeft="24px" marginRight="auto">
        <NextImage
          src="/dark_default.png"
          alt="cyndi logo"
          height={isLessThan560 ? 55 : 70}
          width={isLessThan560 ? 55 : 70}
        />
      </Box>
    </Flex>
  );
};
