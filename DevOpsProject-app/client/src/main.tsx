import ReactDOM from "react-dom/client";
import { AppProvider } from './AppContext';
import App from "./App.tsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar.tsx";
import "bootstrap/dist/css/bootstrap.css";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Home from "./pages/Home.tsx";
import CreatePostPage from "./pages/CreatePostPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import PostCommentsPage from "./pages/PostCommentsPage.tsx";
import UpdateProfilePage from "./pages/UpdateProfilePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/update-profile",
    element: <UpdateProfilePage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/create-post",
    element: <CreatePostPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/comments/:id",
    element: <PostCommentsPage />,
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
]);

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <>
    <AppProvider>
      <NavBar />
      <RouterProvider router={router} />
    </AppProvider>
  </>
);
