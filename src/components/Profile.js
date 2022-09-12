import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PostContext from '../contexts/PostContext';
import axios from 'axios';

const UserProfile = () => {

    let [user, setUser] = useState({});
    let [post, setPost] = useState([]);
    let [posts, setAllPosts] = useState([]);

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

    let userUsername = user.username;






    // let { getPost } = useContext(UserContext);

    // useEffect(() => {
    //     async function fetch() {
    //       await getPost(params.postId)
    //         .then((post) => setPost(post))
    //         .catch((error) => console.log(error))
    //     }
    //     fetch()
    //   }, [params.postId, getPost]
    // );
  
    // function handleSubmit(event) {
    //     event.preventDefault();
    //     editUser(user).then(() => {
    //         navigate(`/user/profile/${user.id}`);
    //     }).catch(error => {
    //         console.log(user);
    //         console.log(error);
    //         navigate('/signin');
    //     });
    // }







    // function userPosts(userUsername) {
    //     function listAllPosts() {
    //         return (
    //             <PostContext.Consumer>
    //             {
    //                 ({ post }) => {
    //                     return <div>
    //                             {post.map((p) => {
    //                                 return (
    //                                     <div key={p.id}>
    //                                         <h5>{p.username} | {p.datePosted}</h5>
    //                                         <p>{p.message}</p>
    //                                  </div>
    //                             )
    //                         })}
    //                     </div>
    //                 }
    //             }
    //             </PostContext.Consumer>
    //         );
    //     }

    //     if (userUsername === post.username) {
    //         return (
    //             <div key={post.id}>
    //                 <h5>{post.username} | {post.datePosted}</h5>
    //                 <p>{post.message}</p>
    //             </div>
    //         )
    //     }
    //     else {
    //         return <h4>This user has yet to post!</h4>
    //     }
    // }


    // setPosts(matchUsernames());

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

    function getPostUsernames() {
        return (
            <PostContext.Consumer>
            {
                ({ post }) => {
                    return <div>
                            {post.map((p) => {
                                return (
                                    <div>{p.username}</div>
                                )
                            })}
                    </div>
                }
            }
            </PostContext.Consumer>
        );
    }


    return (
            <div key={user.id}>
                <h1>User Profile: {user.username}</h1>
                <h3>Name: {user.firstName} {user.lastName}</h3>
                <h3>Location: {user.city}, {user.state}</h3>
                <h>Profile Created On: {user.createdAt}</h>
                    <br/><hr></hr><br/>
                {console.log(user)}
                {/* {userPosts()} */}
                {getPostUsernames()}
            </div>
    );
}

export default UserProfile;