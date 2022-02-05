import { server } from "../config";

export const deleteMenuItem = async (id) => {
  console.log(`${server}/api/menuItem/delete/${id}`)

  return fetch(`${server}/api/menuItem/delete/${id}`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
        credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).then((res) => res.json());
};
