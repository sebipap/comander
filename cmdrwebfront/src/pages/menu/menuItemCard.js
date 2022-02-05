import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import { server } from "../../config";

export const MenuItemCard = ({ item }) => {
  const IMAGE = `${server}/images/${item._id}${item.imgURL}`;
  return (
    <Box>
      <Box role={"group"} w="100%" rounded={"lg"} pos={"relative"} zIndex={0}>
        <Box
          rounded={"lg"}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 0,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: "blur(40px)",

            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            src={IMAGE}
            rounded={"lg"}
            height={230}
            width={"100%"}
            objectFit={"cover"}
          />
        </Box>
        <Stack pt={5}>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h3"
            lineHeight="tight"
            isTruncated
          >
            {item.name}
          </Box>

          {item.variants[0] ? (
            <Heading size="md">${item.variants[0].price}</Heading>
          ) : (
            ""
          )}
        </Stack>
      </Box>
    </Box>
  );
};
