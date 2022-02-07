import {
  Heading,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Box,
  Input,
  Text,
  InputLeftElement,
  InputGroup,
  Switch,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { server } from "../../../config";
import { MenuItemImage } from "../../menu/menuItemImage";

export const Prices = () => {
  const [menuItems, setMenuItems] = useState([]);

  const fetchMenuItems = async () => {
    fetch(`${server}/api/menuitem/all`)
      .then((res) => res.json())
      .then((res) => setMenuItems(res));
  };

  useEffect(fetchMenuItems, []);

  return (
    <Box w={["50%", "100%"]}>
      <Table>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Imagen</Th>
            <Th>Precio</Th>
            <Th>Disponible</Th>

          </Tr>
        </Thead>
        <Tbody>
          {menuItems.map((item) =>
            item.variants.concat(item.extras).map((variant) => (
              <Tr>
                <Td>{item.name + " " + variant.name}</Td>
                <Td>
                  <MenuItemImage h="50" item={item} />
                </Td>
                <Td>
                  <InputGroup >
        
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children="$"
                    />
                    <Input value={variant.price}/>
                  </InputGroup>
                </Td>
                <Td>
                  <Switch />
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
};
