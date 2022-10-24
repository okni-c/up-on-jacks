import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import { useLazyQuery } from '@apollo/client';

import Auth from '../../utils/auth';

import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

import { QUERY_ME_BASIC } from '../../utils/queries';

import './commentList.scss';

const CommentList = ({ comments, commentCount, buildId }) => {
    const [commentBody, setBody] = useState('');
    const [profileimg, setProfileimg] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [commentList, setCommentList] = useState([]);
    const [commentCounter, setCommentCounter] = useState(commentCount);

    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const [getMe, { data }] = useLazyQuery(QUERY_ME_BASIC);

    const loggedIn = Auth.loggedIn();

    useEffect(() => {
        if (loggedIn) {
            getMe();
        }
    }, [loggedIn, getMe]);

    const me = data?.me || {};

    useEffect(() => {
        setProfileimg(me.profileimg)
    }, [setProfileimg, me.profileimg])

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
                variables: { commentBody, buildId, profileimg },
            });

            // clear form value
            setBody('');
            setCharacterCount(0);
            setCommentCounter(commentCount + commentList.length + 1);
            let comment = { commentBody: commentBody };
            setCommentList([...commentList, comment]);
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <>
            <h3>{commentCounter} Comments</h3>
            {loggedIn && (
                <div className="commentBox">
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

                    <p
                        className={`${characterCount === 280 || error ? 'error' : ''}`}
                    >
                        Character Count: {characterCount}/280
                    </p>

                    {error && <div>Something broke...</div>}
                </div>
            )}
            {comments.map((comment, index) => (
                <div key={index} className='modalDesc'>
                    <p>{comment.commentBody}</p>
                    <div>
                        <div className="commentIcon">
                            <img src={comment.profileimg} className="followerProfileImg" alt="test" />
                            <Link to={`/profile/${comment.username}`}>
                                {comment.username}</Link>
                        </div>
                        <p>Comment Date: {comment.createdAt}</p>

                    </div>
                </div>
            ))}
            {commentList.map((comment, index) => (
                <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='modalDesc'>
                    <p>{comment.commentBody}</p>
                    <div>
                        <div className="commentIcon">
                            <img src={me.profileimg} className="followerProfileImg" alt="test" />
                            <Link to={`/profile/${me.username}`}>

                                {me.username}</Link>
                        </div>
                        <p>Comment Date: Just Now</p>
                    </div>
                </motion.div>
            ))}
        </>
    );
};

export default CommentList;