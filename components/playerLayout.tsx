import { Box } from "@chakra-ui/layout";
import Sidebar from "./sidebar";

const PlayerLayout = ({ children }) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" top="0" width="250px" left="0">
        <Sidebar />
      </Box>
      <Box
        width="calc(100% - 250px)"
        marginLeft="250px"
        background="green.100"
        height="100%"
        marginBottom="100px"
      >
        page
        {children}
      </Box>
      <Box
        position="absolute"
        left="0"
        bottom="0"
        zIndex={1}
        backgroundColor="yellow.100"
        height="100px"
        width="100vw"
      >
        bottomNavBar
      </Box>
    </Box>
  );
};

export default PlayerLayout;
