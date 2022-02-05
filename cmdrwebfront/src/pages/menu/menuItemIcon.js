import { Box, Heading, Image, Stat, StatNumber } from "@chakra-ui/react";
import { MenuItemImage } from "./menuItemImage";

export const MenuItemIcon = (props) => {
  const { token, _id, imgURL, name, variants } = props.item;

  const defaultVariant = variants[0];

  return (
    <Box
      key={_id}
      style={{
        height: "400px",
        backgroundSize: "100%",
      }}
      animate={{ scale: 1 }}
      initial={{ scale: 0.5 }}
      onClick={props.open}
    >
      <Box style={{ height: "70%" }}>
        <MenuItemImage
          item={props.item}
          variant="top"
          rounded="lg"
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
            borderRadius: 15,
          }}
        />
      </Box>

      <Box mt="1" fontWeight="semibold" as="h3" lineHeight="tight" isTruncated>
        {name}
      </Box>

      {defaultVariant ? (
        <Heading size="md">${defaultVariant.price}</Heading>
      ) : (
        0
      )}
    </Box>
  );
};
