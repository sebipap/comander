export const newMenuItem = async (menuItem) => {
  const response = await fetch("http://localhost:5000/api/menuItem/new", {
    method: "POST", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", 
    referrerPolicy: "no-referrer", 
    body: JSON.stringify(menuItem), 
  });

  return await response
   
};
