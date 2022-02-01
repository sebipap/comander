import {
  Box,
  Button,
  Heading,
  position,
  SimpleGrid,
  Text,
  useToast,
  Image
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MenuNav } from "./menuNav";
import { Plate } from "./plate";

export const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/menuItem/all")
      .then((res) => res.json())
      .then((res) => setMenuItems(res));
  }, []);


  const toast = useToast();


  const addToShoppingCart = (course) => {
    setShoppingCart(
      shoppingCart.concat(course)
    );
    toast({
      title: `Se ${
        course.amount > 1
          ? `han añadido al pedido ${course.amount}`
          : "ha añadido al pedido un"
      } ${course.menuItemName} `,
      position:"top",
      duration: 3000,
      status:"success",
    })
  
  };

  const remove = (course) => {
    setShoppingCart(shoppingCart.filter((aCourse) => aCourse != course));
  };

  const clearShoppingCart = () => setShoppingCart([])

  const categoryNames = [...new Set(menuItems.map((item) => item.category.name))];
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
      <Box m="5">
        <Box m="5">
          <Heading as="h3">{name}</Heading>
        </Box>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px">
          {items.map((item) => (
            <Plate item={item} addToShoppingCart={addToShoppingCart} />
          ))}
        </SimpleGrid>
      </Box>
    );
  };

  const Categories = () => categories.map((cat) => <Category category={cat} />);

  return (
    <>
      <MenuNav shoppingCart={shoppingCart} remove={remove} clearShoppingCart={clearShoppingCart} />
      <Box pt="10" bg="#ebebeb">
        <Categories />
      </Box>
    </>
  );
};
