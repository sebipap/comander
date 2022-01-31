import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ShoppingCart } from "./shoppingCart";

export const MenuNav = (props) => {
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
          <Box p="2">
            <Heading size="lg" letterSpacing={"tighter"}>
              La Voluntad
            </Heading>
          </Box>

          <Spacer />

          <Box p="2">
            {props.shoppingCart.length > 0 && (
              <ShoppingCart
                shoppingCart={props.shoppingCart}
                remove={props.remove}
                clearShoppingCart={props.clearShoppingCart}
              />
            )}
          </Box>
        </Flex>

        {/* <Box flex={1} align="right">
          <Box ml={2} display={{ base: "inline-block", md: "none" }}>
            <Menu isLazy id="navbar-menu"></Menu>
          </Box>
        </Box> */}
      </div>
    </Box>
  );
};
