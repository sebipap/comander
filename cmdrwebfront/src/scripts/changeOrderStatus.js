import { server } from "../config";

export const changeOrderStatus =  ({id, newStatus}) => {
  const response =  fetch(server + "/api/order/changestatus", {
    method: "POST", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", 
    referrerPolicy: "no-referrer", 
    body: JSON.stringify({id, newStatus}), 
  });

  return  response
   
};
