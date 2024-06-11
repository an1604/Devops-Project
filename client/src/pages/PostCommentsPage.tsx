import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';



const PostCommentsPage: React.FC = () => {
    const { id } = useParams();
    const [comments, setComments] = useState<any>([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:5000/comments/${id}`);
                const data = await response.json();
                data.sort((a: any, b: any) => {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                });
                setComments(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchComments();
    }, []);

    return (
        <div className="postcommentspage">
            <h1>Comments</h1>
            <ul>
                {comments.map((comment: any) => (
                    <div className='comment' key={comment._id}>
                        <p style={{width:"30%"}}>{comment.name}:</p>
                        <p style={{width:"50%",textAlign:"left"}}>"{comment.content}"</p>
                        <p>{format(comment.date, 'yyyy-MM-dd HH:mm')}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default PostCommentsPage;