import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { EditMenuItemWindow } from "./editMenuItemWindow";

export const MenuItemNew = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  const emptyMenuItem = {
    name: "",
    category: "",
    description: "",
    imgURL: "",
    variants: [],
    tags: [],
    extras: [],
    aditionalOptions: [],
  };

  return (
    <>
      <Button h="70%" rightIcon={<AddIcon />} colorScheme={"green"} onClick={open}>Nuevo Plato</Button>
      {isOpen && (
        <EditMenuItemWindow
          item={emptyMenuItem}
          close={close}
        />
      )}
    </>
  );
};
