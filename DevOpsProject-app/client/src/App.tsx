import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // check if user is logged in
    const accessToken = localStorage.getItem(
      "accessToken"
    );
    const refreshToken = localStorage.getItem(
      "refreshToken"
    );
    if (accessToken && refreshToken) {
      console.log(
        "Access and refresh tokens exist"
      );
    } else {
      navigate("/login");
    }
  }, []);

  return <></>;
}

export default App;
