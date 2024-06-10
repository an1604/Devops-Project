import React from "react";
import { useState, useEffect } from "react";
import { useAppContext } from "../AppContext";

const NavBar: React.FC = () => {
  const [loged, setLoged] = useState<boolean>(false);
  const { accessToken, refreshToken } = useAppContext();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      setLoged(true);
    }
    else {
      setLoged(false);
    }
  }, [accessToken, refreshToken]);

  return (
    <nav
      className=" navbar navbar-expand navbar-dark sticky-top"
      id="navbar-css"
      aria-label="Second navbar example"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="./home">
          Posty-Club
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample02"
          aria-controls="navbarsExample02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarsExample02"
        >
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/home"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                href="/profile"
              >
                My Profile
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              {loged ? (
                <a className="nav-link" href="/profile">
                  Logout
                </a>
              ) : (
                <a
                  className="nav-link"
                  href="/login"
                >
                  Login
                </a>
              )}
            </li>
          </ul>
          {!loged && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="./register"
                >
                  Register
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
