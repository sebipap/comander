import { server } from "../config";

export const getAllMenuItems = async () =>
  fetch(`${server}/api/menuItem/all`).then((res) => res.json());
