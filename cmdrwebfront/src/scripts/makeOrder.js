import { server } from "../config";

export const makeOrder = async (order) => {
  const response = await fetch(server + "/api/order/new", {
    method: "POST", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", 
    referrerPolicy: "no-referrer", 
    body: JSON.stringify(order), 
  });

  return await response
   
};
