import React from 'react';
import { Link } from 'react-router-dom';

const CommentList = ({ comments }) => {
    return (
        <>
            {comments && comments.map(comment => (
                <div className='modalDesc'>
                    <p>{comment.commentBody}</p>
                    <div>
                        <p>Made by: <Link to={`/profile/${comment.username}`}>{comment.username}</Link></p>
                        <p>Comment Date: {comment.createdAt}</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default CommentList;