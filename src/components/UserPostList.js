import React from 'react';
import PostContext from '../contexts/PostContext';
import { Link } from 'react-router-dom';

const UserPostList = () => {
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

    console.log(getPostUsernames());
    return getPostUsernames();

}

export default UserPostList;




// import React from 'react';
// import UserContext from '../contexts/UserContext';
// import { Link } from 'react-router-dom';

// const UserList = () => {
//     return (
//         <UserContext.Consumer>
//         {
//             ({ user }) => {
//                 return <div>
//                     <h1>Users</h1>
//                     {console.log(user)}
//                     <div>
//                         {user.map((u) => {
//                             return (
//                                 <div key={u.id}>
//                                     <Link to={`/users/${u._id}`}>{u.username}</Link>
//                                     <p>
//                                         {u.firstName} {u.lastName} <span/> | <span/> {u.city}, {u.state}
//                                     </p>
//                                 </div>
//                             )
//                         })}
//                     </div>
//                 </div>
//             }
//         }
//         </UserContext.Consumer>
//     );
// }

// export default UserList;