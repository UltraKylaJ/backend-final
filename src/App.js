import React from 'react';
import { Route, BrowserRouter, Routes, Link } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PostList from './components/PostList';
import NewPost from './components/NewPost';
// import EditPost from './components/EditPost';
import EditUser from './components/EditUser';
import UserProfile from './components/Profile';
import UserList from './components/UserList';
import { UserProvider } from './contexts/UserProvider';
import { PostProvider } from './contexts/PostProvider';

function App() {
  return (
    <UserProvider>
    <PostProvider>
      <div>
          <BrowserRouter>
              <nav>
                  <Link to="/signup">Sign Up</Link>
                  <span> | </span>
                  <Link to="/signin">Sign In</Link>
                  <span> | </span>
                  <Link to="/posts">Home Feed</Link>
                  <span> | </span>
                  <Link to="/users">Users</Link>
                  <hr></hr>
              </nav>
              <Routes>
                  <Route exact path="/" element={ <SignIn /> } />
                  <Route path="/signin" element={ <SignIn /> } />
                  <Route path="/signup" element={ <SignUp /> } />
                  <Route path="/users/edit/:userId" element={ <EditUser /> } />
                  <Route path="/users" element={ <UserList /> } />
                  <Route path="/users/:userId" element={ <UserProfile /> } />
                  <Route path="/posts/new" element={ <NewPost /> } />
                  {/* <Route path="/posts/edit" element={ <EditPost /> } /> */}
                  <Route path="/posts" element={ <PostList /> } />
              </Routes>
          </BrowserRouter>
      </div>
    </PostProvider>
    </UserProvider>
  );
}

export default App;