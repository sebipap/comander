import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  useToast,
  Stack,
  VStack,
  Link,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MenuItem } from "./menuItem";
import { getAllMenuItems } from "../../scripts/GetAllMenuItems";
import MenuSideBar from "./menuSideBar";
import Scroll from "react-scroll";
import { ShoppingCart } from "./shoppingCart";

var scroller = Scroll.scroller;

export const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(
    () =>
      scroller.scrollTo(selectedCategory, {
        duration: 750,
        delay: 0,
        smooth: true,
        offset: -120,

      }),
    [selectedCategory]
  );

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
      duration: 1000,
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
        <Heading size="lg" id={name}>
          {name}
        </Heading>
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
      <MenuSideBar
        ShoppingCart={() => (
          <ShoppingCart
            shoppingCart={shoppingCart}
            remove={remove}
            clearShoppingCart={clearShoppingCart}
          />
        )}
        SideBarContents={() => (
          <Box  w="100%">
            <Text fontSize={25} mb="10" mt="3" fontWeight={"400"}>
              Categorías
            </Text>
            <VStack m={2}>
              {categories.map((cat) => (
                <Link
                  w="100%"
                  fontSize={"lg"}
                  fontWeight="500"
                  p="2"
                  rounded="lg"
                  bgColor={selectedCategory == cat.name && "blue.700"}
                  color={selectedCategory == cat.name && "white"}
                  colorScheme="teal"
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  {cat.name}
                </Link>
              ))}
            </VStack>
          </Box>
        )}
        BodyContents={() => (
          <Box>
            <Heading mb="5">Productos</Heading>
            <Categories />
          </Box>
        )}
      />
    </>
  );
};
