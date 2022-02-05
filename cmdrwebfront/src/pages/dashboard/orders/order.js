import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { server } from "../../../config";

const Course = ({ course }) => {
  const {
    amount,
    special,
    courseMoment,
    aditionalOptionsConfiguration,
    variant,
    menuItem,
    extras,
    price,
  } = course;
  return (
    <Box p={5} border={"1px solid gray"}>
      <Text>{menuItem.name}</Text>

      <Text>Cantidad: {amount}</Text>

      <Text>{special}</Text>
      <Text>{courseMoment}</Text>
      <Text>
        {aditionalOptionsConfiguration.map((option) => (
          <Text>
            {" "}
            {option.propertyName}: {option.value}{" "}
          </Text>
        ))}
      </Text>
      <Text>
        Variante: {variant.name} {variant.price}{" "}
      </Text>
      <Text> Precio unitario :{price}</Text>
      <Text>
				<Box border="1px solid gray">

        Extras:
        {extras.map((extra) => (
					<>
            <Text>{extra.name}</Text>
            <Text>{extra.price}</Text>
          </>
        ))}
				</Box>
      </Text>
    </Box>
  );
};

export const Order = ({ order }) => {
  const [courses, setCourses] = useState([]);
  const { _id, timeDate, deliveryLocation, status, orderNote } = order;

  useEffect(() => {
    fetch(server + "/api/order/courses/" + _id)
      .then((res) => res.json())
      .then((res) => setCourses(res));
  }, []);

  return (
    <Box p={5} border={"1px solid gray"}>
      <Text>{_id}</Text>
      <Text>{timeDate}</Text>
      <Text>{deliveryLocation}</Text>
      <Text>{status}</Text>
      <Text>{orderNote}</Text>

      {courses.map((course) => (
        <Course course={course} />
      ))}
    </Box>
  );
};
