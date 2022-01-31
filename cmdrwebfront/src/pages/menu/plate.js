import { useState } from "react";
import { PlateIcon } from "./plateIcon";
import { PlateWindow } from "./plateWindow";

export const Plate = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return (
    <>
      <PlateIcon item={props.item} open={open} />
      {isOpen && (
        <PlateWindow
          item={props.item}
          close={close}
          addToShoppingCart={props.addToShoppingCart}
        />
      )}
    </>
  );
};
