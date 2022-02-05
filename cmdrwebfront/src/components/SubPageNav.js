import { Box, Flex, Heading, HStack, Spacer, Text } from "@chakra-ui/react";

export const SubPageNav = ({subpage}) => {
  return (
    <Box
      position="sticky"
      top="0"
      as="nav"
      w="100%"
      bg="rgba(255,255,255,0.6)"
      css={{ backdropFilter: "blur(10px)" }}
      zIndex={1}
    >
      <div>
        <Flex m="5">
          <HStack p="2" spacing={5}>
            <Heading fontSize={25} letterSpacing={"tighter"}>
              La Voluntad
            </Heading>

            <Text fontSize={20}> | {subpage} </Text>
          </HStack>

          <Spacer />
        </Flex>
      </div>
    </Box>
  );
};
