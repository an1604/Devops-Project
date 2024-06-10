import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import React, { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import avatarProfile from "../assets/avatarProfile.jpg";
import { uploadPhoto } from "../services/file-service";
import { useNavigate } from "react-router-dom";
import { registrUser } from "../services/user-services";


interface RegisterForm {
  username: string;
  email: string;
  password: string;
  imgUrl?: string;
}

interface IUser {
  username: string;
  email: string;
  password: string;
  imgUrl?: string;
}

const RegisterPage: React.FC = (): React.ReactNode => {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState<File>();
  // Change the return type to React.ReactNode
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    try {
      if (imgSrc) {
        console.log("submitting form...");
        const newFormData = new FormData();
        newFormData.append("file", imgSrc);
        newFormData.append("username", formData.username);
        newFormData.append("email", formData.email);
        newFormData.append("password", formData.password);
        console.log(newFormData);
        axios.post("http://localhost:5000/auth/register", newFormData).then((res) => {
          console.log(res);
          navigate("/login");
        });
      }
    } catch (error) {
      console.log("error in register page: ", error);
      console.log(error);
    }
  };

  const selectImg = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-contant-center position-relative">
          {imgSrc ? (
            <img src={URL.createObjectURL(imgSrc!)} alt="profile" className="imgProfile" />
          ) : (
            <img src={avatarProfile} alt="profile" className="imgProfile" />
          )}
          <button className="btn position-absolute end-0 bottom-0" onClick={selectImg}>
            <FontAwesomeIcon className="iconProfile" icon={faImage} />
          </button>
        </div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          id="file"
          name="file"
          onChange={
            (event: ChangeEvent<HTMLInputElement>) => {
              if (event.target.files) {
                setImgSrc(event.target.files[0]);
              }
              console.log(event.target?.files);
            }}
          ref={fileInputRef}
          style={{ display: "none" }}
        ></input>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
export default RegisterPage;
