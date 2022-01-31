export const shoppingCartPrice = async (shoppingCart) => {
  const response = await fetch("http://192.168.1.60:5000/api/course/shoppingCartPrice", {
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
