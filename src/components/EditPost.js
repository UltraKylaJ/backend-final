import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostContext from '../contexts/PostContext';

const EditPost = () => {

    let [post, setPost] = useState({});

    let params = useParams();
    let navigate = useNavigate();

    let { getPost, editPost } = useContext(PostContext);

    useEffect(() => {
        async function fetch() {
          await getPost(params.postId)
            .then((post) => setPost(post))
            .catch((error) => console.log(error))
        }
        fetch()
      }, [params.postId, getPost]
    );

    function handleChange(event) {
        setUser((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }
  
    function handleSubmit(event) {
        event.preventDefault();
        editPost(post).then(() => {
            navigate(`/posts`);
        }).catch(error => {
            console.log(error);
            navigate('/signin');
        });
    }

    function userLocal() {
        let username = window.localStorage.getItem("userData");
        return username
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>EDIT POST</h1>
            <h3>{userLocal()}</h3>
            <input placeholder={`${post.message}`} type="textarea" name="message" value={post.message} onChange={handleChange} />
            <br></br><br></br>
            <button>Submit Post Changes</button>
        </form>   
    )
};

export default EditPost;