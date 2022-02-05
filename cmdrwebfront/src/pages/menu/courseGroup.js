import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuItemImage } from "./menuItemImage";

const LastPlateIcon = (props) => (
  <PlateIcon
    as={motion.img}
    plate={props.plate}
    marginLeft="0"
    courseIdAndIndex={props.courseIdAndIndex}
  />
);

const PlateIcon = (props) => (
  <Box
    as={motion.div}
    layoutId={props.courseIdAndIndex}
    key={props.courseIdAndIndex}
    display="inline"
  >
    <MenuItemImage
      item={props.plate}
      borderRadius="lg"
      boxSize="40px"
      alt={props.plate.name}
      fit="cover"
      shadow="lg"
      display="inline"
      marginLeft="1"
    />


  </Box>
);

const Icons = (props) => {
  const { amount, courseId, plate } = props;

  let icons = [];
  let i = 1;
  while (i <= amount - 1) {
    icons.push(<PlateIcon plate={plate} courseIdAndIndex={courseId + i} />);
    i++;
  }

  icons.push(<LastPlateIcon plate={plate} courseIdAndIndex={courseId + i} />);

  return icons;
};

export const CoursesGroup = (props) => {
  const { amount, plate, courseId, extra } = props;

  return (
    <Box as={motion.div} display="block" margin="2">
      <Box marginLeft="0" display="inline">
        <Icons amount={amount} courseId={courseId} plate={plate} />
      </Box>
    </Box>
  );
};
