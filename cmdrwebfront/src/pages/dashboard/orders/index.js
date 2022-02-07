import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { SubPageNav } from "../../../components/SubPageNav";
import { server } from "../../../config";
import { Order } from "./order";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setInterval(() => {
      fetch(`${server}/api/order/all`)
        .then((res) => res.json())
        .then((res) => setOrders(res));
    }, 1000);
  }, []);

  return (
    <>
      <SubPageNav subpage={"Ordenes"} />

      <SimpleGrid columns={[1,2,3]}>
        {orders.map((order) => (
          <Order order={order} />
        ))}
      </SimpleGrid>
    </>
  );
};
