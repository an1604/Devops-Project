import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostComp from '../components/PostComp';


const Home: React.FC = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<any>([]);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/posts', {
                });
                response.data.sort((a: any, b: any) => {
                    return new Date(b.date).valueOf() - new Date(a.date).valueOf();
                });
                console.log(response.data);
                setPosts(response.data);
            } catch (error) {
                console.error(error);
                setError('Error getting posts');
            }
        }
        // if (!localStorage.getItem('accessToken') || !localStorage.getItem('refreshToken')) {
        //     navigate('/login');
        // }
        fetchPosts();
        setLoading(false);
    }, []);


    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <button className='create-post-btn' onClick={() => navigate('/create-post')}>Create Post</button>
            <ul>
                {posts.map((post: any) => (
                    <PostComp key={post._id} post={post} />
                ))}
            </ul>
        </div>
    );
};

export default Home;
