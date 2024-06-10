import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface MyComponentProps {
  key: any;
  post: any;
}

const PostComp: React.FC<MyComponentProps> = ({ post }: any) => {
  const navigate = useNavigate();
  const [comment, setComment] = useState<string>("");
  const [photo, setPhoto] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [username, setUsername] = useState("");

  const getPostPhoto = () => {
    try {
      axios.get(`http://localhost:5000/posts/photo/${post._id}`, {
        responseType: "blob",
      }).then((response) => {
        setPhoto(URL.createObjectURL(response.data));
      });
    } catch (error) {
      console.error(error);
    }
  }

  const fetchUserPhoto = async () => {
    console.log("fetchUserPhoto");
    try {
      const response = await axios.get(`http://localhost:5000/user/photo/${post.userId}`, {
        responseType: "blob",
      });
      console.log(response);
      setUserPhoto(URL.createObjectURL(response.data));
    } catch (error) {
      console.error(error);
    }
  }

  const viewComments = () => {
    navigate(`/comments/${post._id}`);
  };

  const getUserName = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/username/${post.userId}`);
      setUsername(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const addComment = (input: string) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
    } else {
      try {
        axios.post(`http://localhost:5000/comments/`,
          {
            content: input,
            postId: post._id,
            name: username
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        ).then(() => {
          navigate(`/comments/${post._id}`);
        });

      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getPostPhoto();
    fetchUserPhoto();
    getUserName();
  }, []);

  return (
    <div className="postcomp">
      <div className="postcomp-user">
        {userPhoto && <img className="postcomp-user-img" src={userPhoto} alt="user" />}
        <p className="postcomp-user-username">{username}</p>
      </div>
      <div className="postcomp-img-container">
        <img className="postcomp-img" src={photo} alt={post.title} />
      </div>
      <div className="postcomp-info">
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <p>Comments: {post.numComments || 0}</p>
      </div>
      <button onClick={() => { viewComments() }}>View Comments</button>
      <div className="add-comment">
        <input type="text" placeholder="Add a comment" onChange={(e) => {
          setComment(e.target.value)
        }} />
        <button onClick={() => { addComment(comment) }}>Add</button>
      </div>
    </div>
  );
};

export default PostComp;
