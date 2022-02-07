import { server } from "../config";

export const uploadImg = async (file, name) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("name", name);


  const options = {
    method: "POST",
    body: formData,
  };

  return fetch(server + "/api/image/upload", options)
  .then(res => res.json())

};
