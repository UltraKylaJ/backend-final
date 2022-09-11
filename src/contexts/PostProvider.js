import axios from "axios";
import { useEffect, useState } from "react";
import PostContext from "./PostContext";

export const PostProvider = (props) => {

    const [ post, setPost ] = useState([]);
    const baseUrl = "http://localhost:3000/api/posts/";

    useEffect(() => {
        async function fetchData() {
            await getAllPosts();
        }
        fetchData();
    }, []);

    function getAllPosts() {
        return axios.get(baseUrl).then(response => setPost(response.data));
    }

    function getPost(id) {
        let url = baseUrl + id;
        console.log(url);

        return axios.get(url, post).then(response => {
            console.log(response.data)
            return new Promise(resolve => resolve(response.data))
        });
    }

    function addPost(post) {        
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myPostToken')}`
        };

        return axios.post(baseUrl, post, {headers: myHeaders}).then(response => {
            getAllPosts();
            return new Promise(resolve => resolve(response.data));
        })
    }

    function editPost(post) {
        let url = baseUrl + `${post._id}`;
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myPostToken')}`
        };

        return axios.put(url, post, { headers: myHeaders })
            .then(response => {
                console.log(post);
                getAllPosts();
                console.log("you have edited your post!");

                return new Promise(resolve => resolve(response.data));
            }
        )
    }

    function deletePost(id) {
        // 
    }

    return (
        <PostContext.Provider value={{
            post,
            getPost,
            addPost,
            editPost,
            deletePost
        }}>
            { props.children }
        </PostContext.Provider>
    )
};