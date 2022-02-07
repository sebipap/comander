import { server } from "../config";

export const shoppingCartPrice = async (shoppingCart) => {
  const response = await fetch(server + "/api/course/shoppingCartPrice", {
    method: "POST", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", 
    referrerPolicy: "no-referrer", 
    body: JSON.stringify(shoppingCart), 
  });

  const finalPriceObj = await response.json()
  return finalPriceObj.shoppingCartPrice; 
};
