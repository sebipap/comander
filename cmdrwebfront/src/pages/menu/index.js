import {
  Box,
  Button,
  Heading,
  position,
  SimpleGrid,
  Text,
  useToast,
  Image,
  List,
  ListItem,
  Flex,
  HStack,
  Grid,
  GridItem,
  Container,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MenuNav } from "./menuNav";
import { MenuItem } from "./menuItem";
import { getAllMenuItems } from "../../scripts/GetAllMenuItems";
import MenuSideBar from "./menuSideBar";

export const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => getAllMenuItems().then((res) => setMenuItems(res)), []);

  const toast = useToast();

  const addToShoppingCart = (course) => {
    setShoppingCart(shoppingCart.concat(course));
    toast({
      title: `Se ${
        course.amount > 1
          ? `han añadido al pedido ${course.amount}`
          : "ha añadido al pedido un"
      } ${course.menuItemName} `,
      position: "top",
      duration: 3000,
      status: "success",
    });
  };

  const remove = (course) => {
    setShoppingCart(shoppingCart.filter((aCourse) => aCourse != course));
  };

  const clearShoppingCart = () => setShoppingCart([]);

  const categoryNames = [
    ...new Set(menuItems.map((item) => item.category.name)),
  ];
  const categories = categoryNames
    .map((name) => {
      return {
        name,
        items: menuItems.filter((item) => item.category.name === name),
      };
    })
    .filter((cat) => cat.name);

  const Category = (props) => {
    const { name, items } = props.category;
    return (
      <Stack spacing="10" mb="10">
        <hr />
        <Heading size="lg">{name}</Heading>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px">
          {items.map((item) => (
            <MenuItem item={item} addToShoppingCart={addToShoppingCart} />
          ))}
        </SimpleGrid>
      </Stack>
    );
  };

  const Categories = () => categories.map((cat) => <Category category={cat} />);

  return (
    <>
      <MenuNav
        shoppingCart={shoppingCart}
        remove={remove}
        clearShoppingCart={clearShoppingCart}
      />
      <MenuSideBar>
        <Box>
          <Heading size="md" mb="5">
            Categorías
          </Heading>
          <VStack>
            {categories.map((cat) => (
              

                <Text w="100%"><a href="*">{cat.name}</a></Text>
              
            ))}
          </VStack>
        </Box>
        <Box>
          <Heading mb="5">Productos</Heading>
          <Categories />
        </Box>
      </MenuSideBar>
    </>
  );
};
