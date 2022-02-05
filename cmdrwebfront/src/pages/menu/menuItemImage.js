import { Heading, Image } from "@chakra-ui/react";
import { server } from "../../config";

export const MenuItemImage = ({ item, ...leftOver }) => {
  const { _id, imgURL } = item;

  const fileName = imgURL == "" ? "default.png" : `${_id}${imgURL}`;

  return (
    <>
      <Image src={`${server}/images/${fileName}`} {...leftOver} />
    </>
  );
};
