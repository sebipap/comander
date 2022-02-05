import { useState } from "react";
import { MenuItemIcon } from "../../menu/menuItemIcon";
import { EditMenuItemWindow } from "./editMenuItemWindow";

export const MenuItemEdit = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return (
    <>
      <MenuItemIcon item={props.item} open={open} />
      {isOpen && (
        <EditMenuItemWindow
          item={props.item}
          close={close}
          addToShoppingCart={props.addToShoppingCart}
        />
      )}
    </>
  );
};
