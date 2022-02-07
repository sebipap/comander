import { server } from "../config";

export const fullCourseData = async (course) => {
  const response = await fetch(server + "/api/course/fullData", {
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

  const fullData = await response.json()
  return fullData; 
};
