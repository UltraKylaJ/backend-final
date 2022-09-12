import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostContext from '../contexts/PostContext';

const NewPost = () => {
    
    let [user, setUser] = useState({});

    function userLocal() {
        let username = window.localStorage.getItem("userData");
        return username
    }

    let [ newPost, setNewPost ] = useState({
        username: `${user.username}`,
        message: ""
    });

    let { addPost } = useContext(PostContext);
    let navigate = useNavigate();

    function handleChange(event) {
        setNewPost((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        addPost(newPost).then(() => {
            navigate('/posts');
        }).catch(error => {
            console.log(error);
            navigate('/signin');
        });
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <h1>NEW Post</h1>
            <h3>{userLocal()}</h3>
            <span>Post Content  </span>
            <input placeholder="What's on your mind today?" type="textarea" name="message" value={newPost.message} onChange={handleChange} />
            <br></br><br></br>
            <button>Post It!</button>
        </form>
    )
};

export default NewPost;