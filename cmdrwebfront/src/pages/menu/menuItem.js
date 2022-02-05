import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { MenuItemCard } from "./menuItemCard";
import { MenuItemIcon } from "./menuItemIcon";
import { MenuItemWindow } from "./menuItemWindow";

export const MenuItem = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return (
    <>
      <Box onClick={open}>
        <MenuItemCard item={props.item} />
      </Box>
      {isOpen && (
        <MenuItemWindow
          item={props.item}
          close={close}
          addToShoppingCart={props.addToShoppingCart}
        />
      )}
    </>
  );
};
