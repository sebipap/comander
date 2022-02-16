import React from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  MenuIcon,
  Button,
  DrawerCloseButton,
  Container,
  Center,
} from "@chakra-ui/react";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import { MenuNav } from "./menuNav";

export default function MenuSideBar({
  BodyContents,
  SideBarContents,
  ShoppingCart,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MenuNav>
        <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen}>
          <ShoppingCart />
        </MobileNav>
      </MenuNav>
      <Box minH="100vh"  className="pageBody">
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
          className="sidebar"
          p={0}
          shadow="2xl"
        >
   
          <SideBarContents />
            <hr/>
          <Box mt="10">
            <ShoppingCart />
          </Box>

        </SidebarContent>
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <DrawerCloseButton onClick={onClose} />
            <Box mt={5}>
              <SidebarContent onClose={onClose}>
                <SideBarContents />
              </SidebarContent>
            </Box>
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}

        <Box ml={{ base: 0, md: 60 }} p={[5, 20]}>
          <BodyContents />
        </Box>
      </Box>
    </>
  );
}

const SidebarContent = ({ children, onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      m="5"
      rounded="lg"
      {...rest}
      p="2"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Container onClick={onClose}>{children}</Container>
      </Flex>
    </Box>
  );
};

const MobileNav = ({ children, onOpen, ...rest }) => {
  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<HamburgerIcon />}
        variant="ghost"
        {...rest}
      >
        Categorías
      </Button>

      <Box {...rest}>{children}</Box>
    </>
  );
};
