import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import Auth from '../../utils/auth';

import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

const CommentList = ({ comments, buildId, user }) => {
    const [commentBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [commentList, setCommentList] = useState([]);
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const loggedIn = Auth.loggedIn();

    // update state based on form input changes
    const handleChange = (event) => {
        if (event.target.value.length <= 280) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await addComment({
                variables: { commentBody, buildId },
            });

            // clear form value
            setBody('');
            setCharacterCount(0);
            let comment = { commentBody: commentBody };
            setCommentList([...commentList, comment])
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <>
            {loggedIn && (
                <div>
                    <p
                        className={`${characterCount === 280 || error ? 'error' : ''}`}
                    >
                        Character Count: {characterCount}/280
                    </p>
                    <form
                        className=""
                        onSubmit={handleFormSubmit}
                    >
                        <textarea
                            placeholder="Write a comment..."
                            value={commentBody}
                            className=""
                            onChange={handleChange}
                        ></textarea>

                        <button className="" type="submit">
                            Submit
                        </button>
                    </form>

                    {error && <div>Something broke...</div>}
                </div>
            )}

            {comments.map((comment, index) => (
                <div key={index} className='modalDesc'>
                    <p>{comment.commentBody}</p>
                    <div>
                        <p>Made by: <Link to={`/profile/${comment.username}`}>
                            <img src={comment.profileimg} className="followerProfileImg" alt="test" />
                            {comment.username}</Link></p>
                        <p>Comment Date: {comment.createdAt}</p>
                    </div>
                </div>
            ))}
            {commentList.map((comment, index) => (
                <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='modalDesc'>
                    <p>{comment.commentBody}</p>
                    <div>
                        <p>Made by: <Link to={`/profile/${user.username}`}>
                            <img src={user.profileimg} className="followerProfileImg" alt="test" />
                            {user.username}</Link></p>
                        <p>Comment Date: Just Now</p>
                    </div>
                </motion.div>
            ))}
        </>
    );
};

export default CommentList;