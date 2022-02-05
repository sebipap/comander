import { Box, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { SubPageNav } from "../../../components/SubPageNav";
import { Order } from "./order";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(
    () =>
      fetch("http://localhost:5000/api/order/all")
        .then((res) => res.json())
        .then((res) => setOrders(res)),
    []
  );

  return (
    <>
      <SubPageNav subpage={"Ordenes"} />

      {orders.map(order => <Order order={order} />)}
    </>
  );
};
