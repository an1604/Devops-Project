import React, { useState, } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [user, setUser] = useState<any>({});
  const [image, setImage] = useState<File>();

  const fetchUserData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
    } else {
      try {
        const response = await axios.get("http://localhost:5000/user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", image as Blob);
    formData.append("user", user);
    formData.append("title", title);
    formData.append("content", content);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        navigate("/login");
      }
      else {
        fetchUserData();
        axios.post("http://localhost:5000/posts", formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }).then(() => {
            navigate("/home");
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-post">
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />
        <input
          type="file"
          placeholder="Image URL"
          onChange={(e) => {
            if (e.target.files) {
              setImage(e.target.files[0]);
            }
          }
          }
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
