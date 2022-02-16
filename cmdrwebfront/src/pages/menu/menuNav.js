import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

export const MenuNav = ({ children }) => {
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
        <SimpleGrid columns={[1, 2]}>
          <Box p="2">
            <HStack p="2" spacing={5}>
              <Heading fontSize={25} letterSpacing={"tighter"}>
                La Voluntad
              </Heading>

              <Text fontSize={20}> | Carta </Text>
            </HStack>
          </Box>
          <Box>
            <Spacer />
            <Box p={2}>
              {children[0] ? (
                <SimpleGrid columns={[1, 2]} maxW={"400px"} spacing="5">
                  {children}{" "}
                </SimpleGrid>
              ) : (
                <Center>{children}</Center>
              )}
            </Box>
          </Box>
        </SimpleGrid>
      </div>
    </Box>
  );
};
