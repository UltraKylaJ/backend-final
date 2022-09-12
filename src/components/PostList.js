import React from 'react';
import PostContext from '../contexts/PostContext';
import { Link } from 'react-router-dom';

const PostList = () => {

    let username = window.localStorage.getItem("userData");

    if (!username) {
        return (
            <PostContext.Consumer>
            {
                ({ post }) => {
                    return <div>
                        <h1>Home Feed</h1>
                        {console.log(post)}
                        <div>
                            {post.map((p) => {
                                return (
                                    <div>
                                        <h5>{p.username} | {p.datePosted}</h5>
                                        <p>{p.message}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            }
            </PostContext.Consumer>
        );
    }
    else {
        return (
            <PostContext.Consumer>
            {
                ({ post }) => {
                    return <div>
                        <h1>Home Feed</h1>
                        <Link to="/posts/new">Add New Post</Link>
                        {console.log(post)}
                        <div>
                            {post.map((p) => {
                                return (
                                    <div>
                                        <h5>{p.username} | {p.datePosted}</h5>
                                        <p>{p.message}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            }
            </PostContext.Consumer>
        );
    }
}

export default PostList;