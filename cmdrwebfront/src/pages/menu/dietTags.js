import { Avatar, Box, Tag, TagLabel } from "@chakra-ui/react";

const getDietData = (diet) => {
  switch (diet) {
    case "vegan":
      return {
        imgURL:
          "https://ih1.redbubble.net/image.1010171048.5539/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg",
        name: "Apto Vegano",
      };
    case "kosher":
      return {
        imgURL:
          "https://staticmer2.emol.cl/Fotos/2013/02/14/file_20130214180415.jpg",
        name: "Kosher Parve",
      };
    case "vegetarian":
      return {
        imgURL: "https://i.ebayimg.com/images/g/qzYAAOSwUV9WmMA-/s-l400.jpg",
        name: "Apto Vegetariano",
      };
    case "celiac":
      return {
        imgURL:
          "https://www.clarin.com/img/2019/12/04/el-logo-oficial-sin-tacc___u6xfaxi7_720x0__1.jpg",
        name: "Sin Tacc",
      };
    case "highCarb":
      return {
        imgURL: "",
        name: "Alto en carbohidratos",
      };
    default:
      return { imgURL: "", name: diet, description: "" };
  }
};

export const DietTags = (props) => (
  <Box>
    {props.tags.map((tag) => {
      const { imgURL, name } = getDietData(tag);
      return (
        <Tag size="lg" borderRadius="full" m="1">
          <Avatar src={imgURL} size="xs" name={name} ml={-1} mr={2} />
          <TagLabel>{name}</TagLabel>
        </Tag>
      );
    })}
  </Box>
);
