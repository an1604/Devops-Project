import React, { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../AppContext";
import {MachineIP} from '../IP'

interface LoginCredentials {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: "", password: "" });
  const { updateAccessToken, updateRefreshToken } = useAppContext();
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials, [name]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    try {
      axios
        .post(
          `http://${MachineIP}:5000/auth/login`,
          credentials,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => {
          updateAccessToken(res.data.accessToken);
          updateRefreshToken(res.data.refreshToken);
          navigate("/home");
        }).catch((error) => {
          if (error.response && error.response.status === 401) {
            alert("User does not exist or invalid credentials");
          }
          else {
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem(
      "accessToken"
    );
    const refreshToken = localStorage.getItem(
      "refreshToken"
    );
    if (accessToken && refreshToken) {
      navigate("/home");
    } else {
      console.log("No access or refresh tokens");
    }
  }, []);

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
