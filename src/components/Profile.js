import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PostContext from '../contexts/PostContext';
import axios from 'axios';

const UserProfile = () => {

    let [user, setUser] = useState({});
    let [post, setPosts] = useState([]);

    let params = useParams();

    let { getUser } = useContext(UserContext);
    let { getPost } = useContext(PostContext);

    console.log(params.userId)

    useEffect(() => {
        async function fetch() {
            await getUser(params.userId)
                .then((user) => setUser(user))
                .catch((error) => console.log(error))
            }
        fetch();
        }, [params.userId, getUser]
    );

    // useEffect(() => {
    //     async function fetchPosts() {
    //         await listPosts(params.username)
    //             .then((post) => setPosts(post))
    //             .catch((error) => console.log(error))
    //         }
    //     fetchPosts();
    //     }, [params.username, getPost]
    // );

    // function listPosts() {
    //     const baseUrl = "http://localhost:3000/api/users/";
    //     let url = baseUrl + user.id
    //     return axios.get(url).then(response => setPosts(response.data));
    // }

    return (
            <div>
                <h1>User Profile: {user.username}</h1>
                <h3>Name: {user.firstName} {user.lastName}</h3>
                <h3>Location: {user.city}, {user.state}</h3>
                <h>Profile Created On: {user.createdAt}</h>
                    <br/><hr></hr><br/>
                {console.log(user)}
                <PostContext.Consumer>
                {
                    ({ post }) => {
                        return (
                            <div>
                                {post.map((p) => {
                                    return (
                                        <div key={p.id}>
                                            <h5>{p.username} | {p.datePosted}</h5>
                                            <p>{p.message}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }
                }
                </PostContext.Consumer>
            </div>
    );
}

export default UserProfile;