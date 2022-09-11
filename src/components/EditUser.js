import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const EditUser = () => {

    let [user, setUser] = useState({});

    let params = useParams();
    let navigate = useNavigate();

    let { getUser, editUser } = useContext(UserContext);

    useEffect(() => {
        async function fetch() {
          await getUser(params.userId)
            .then((user) => setUser(user))
            .catch((error) => console.log(error))
        }
        fetch()
      }, [params.userId, getUser]
    );

    function handleChange(event) {
        setUser((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }
  
    function handleSubmit(event) {
        event.preventDefault();
        editUser(user).then(() => {
            navigate(`/user/profile/${user.id}`);
        }).catch(error => {
            console.log(user);
            console.log(error);
            navigate('/signin');
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>EDIT PROFILE</h1>
            <h3>{user.username}</h3>
            <span>First Name</span>
            <input placeholder={`${user.firstName}`} type="text" name="firstName" value={user.firstName} onChange={handleChange} />
            <br></br><br></br>
            <span>Last Name</span>
            <input placeholder={`${user.lastName}`} type="text" name="lastName" value={user.lastName} onChange={handleChange} />
            <br></br><br></br>
            <span>City  </span>
            <input placeholder={`${user.city}`} type="text" name="city" value={user.city} onChange={handleChange} />
            <br></br><br></br>
            <span>State  </span>
            <input placeholder={`${user.state}`} type="text" name="state" value={user.state} onChange={handleChange} />
            <br></br><br></br>
            <button>Submit Profile Changes</button>
        </form>   
    )
};

export default EditUser;