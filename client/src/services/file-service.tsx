import axios from "axios";
import { MachineIP } from "../IP";

export const uploadPhoto = async (photo: File) => {
  console.log("Uploading photo..." + photo);
  const formData = new FormData();
  if (photo) {
    formData.append("file", photo);
    const res = await axios.post(
      `http://${MachineIP}:5000/file`,
      formData,
      {
        headers: {
          "Content-Type": "image/jpeg",
        },
      }
    );
    console.log(res);
    return res.data.url;
  }
};
