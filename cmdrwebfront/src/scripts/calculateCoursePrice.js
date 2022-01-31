export const calculateCoursePrice = async (course) => {
  const response = await fetch("http://192.168.1.60:5000/api/course/price", {
    method: "POST", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", 
    referrerPolicy: "no-referrer", 
    body: JSON.stringify(course), 
  });

  const finalPriceObj = await response.json()
  return finalPriceObj.price; 
};
