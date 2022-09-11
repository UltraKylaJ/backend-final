import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostContext from '../contexts/PostContext';
import UserContext from '../contexts/UserContext';

const NewPost = () => {
    
    let [user, setUser] = useState({});

    let params = useParams();

    function userLocal() {
        return JSON.parse(window.localStorage.getItem("userData"))
    }

    // function setUser(user) {
    //     return window.localStorage.setItem("user", JSON.stringify(user))
    // }
    
    // let { getUser } = useContext(UserContext);

    // useEffect(() => {
    //     async function fetch() {
    //         await getUser(userLocal())
    //             .then((user) => setUser(user))
    //             .catch((error) => console.log(error))
    //         }
    //     fetch();
    //     }, [params.userId, getUser]
    // );

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
            <h5>{newPost.username}</h5>
            <span>Post Content  </span>
            <input placeholder="What's on your mind today?" type="textarea" name="message" value={newPost.message} onChange={handleChange} />
            <br></br><br></br>
            <button>Post It!</button>
        </form>
    )
};

export default NewPost;