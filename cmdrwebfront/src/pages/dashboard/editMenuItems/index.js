import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Switch,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getAllMenuItems } from "../../../scripts/GetAllMenuItems";
import { DashboardNav, SubPageNav } from "../../../components/SubPageNav";
import { MenuItemEdit } from "./menuItemEdit";

import { MenuItemNew } from "./menuItemNew";

export const EditMenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => getAllMenuItems().then((res) => setMenuItems(res)), []);


  return (
    <>
      <SubPageNav subpage={"Crear y editar platos"}/>

      <Box m="10">
        <SimpleGrid spacing={3} columns={[1, 2, 3, 4, 5, 6]}>
          <MenuItemNew />
          {menuItems.map((item) => (
            <MenuItemEdit item={item} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};
