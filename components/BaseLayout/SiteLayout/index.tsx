import React from "react";
import { Box, Flex, Spinner, useMediaQuery } from "@chakra-ui/react";
import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";
import { useMe } from "../../../lib/hooks";

export const SiteLayout = ({ children }) => {
  const { user, isLoading } = useMe();
  const [isLessThan560] = useMediaQuery("(max-width: 560px)");

  if (isLoading) {
    return <Spinner />;
  }

  const mainBodyHeight = isLessThan560
    ? "calc(100vh - 65px)"
    : "calc(100vh - 80px)";

  console.log(JSON.stringify(user));

  return (
    <Box width="100vw" height="100vh">
      <Navbar user={user} />
      <Flex>
        <Sidebar user={user} />
        <Box
          padding="48px"
          width="100%"
          height={mainBodyHeight}
          backgroundColor="gray.100"
        >
          {children}
        </Box>
      </Flex>
    </Box>
  );
};
