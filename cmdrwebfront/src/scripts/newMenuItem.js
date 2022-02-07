import { server } from "../config";

export const newMenuItem = async (menuItem) => {
  return fetch(`${server}/api/menuItem/new`, {
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
  }).then((res) => res.json());
};
