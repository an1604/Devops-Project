import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../AppContext";

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>({});
    const { updateAccessToken, updateRefreshToken } = useAppContext();
    const [userPhoto, setUserPhoto] = useState("");
    const [userPosts, setUserPosts] = useState([]);
    const { accessToken } = useAppContext();

    const logout = () => {
        updateAccessToken("");
        updateRefreshToken("");
        navigate("/login");
    }

    const fetchUserPhoto = async (id: string) => {
        console.log("fetchUserPhoto");
        try {
            const response = await axios.get(`http://localhost:5000/user/photo/${id}`, {
                responseType: "blob",
            });
            console.log(response);
            setUserPhoto(URL.createObjectURL(response.data));
        } catch (error) {
            console.error(error);
        }
    }

    const fetchUserPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/posts/byuser`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(response.data);
            setUserPosts(response.data);
        } catch (error) {
            console.error(error);
        }
    }

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
                fetchUserPhoto(response.data._id);
                fetchUserPosts();
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        if (accessToken && refreshToken) {
            console.log("Access and refresh tokens exist");
            fetchUserData();
            
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <>
            <div className="profile-page">
                <h1>Profile Page</h1>
                {userPhoto && <img className="user-photo" src={userPhoto} alt="user photo" />}
                <div className="user-info">
                    <h2>User Info</h2>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </div>
                <div className="user-btns">
                    <button onClick={() => navigate("/update-profile")}>Update</button>
                    <button style={{ backgroundColor: "#c73a3a" }} onClick={() => logout()}>Logout</button>
                </div>
            </div>
            <div>
                <h2>My Posts</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ProfilePage;

