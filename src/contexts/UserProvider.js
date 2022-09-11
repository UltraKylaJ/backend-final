import axios from "axios";
import { useEffect, useState } from "react";
import UserContext from "./UserContext";

export const UserProvider = (props) => {

    const [ user, setUser ] = useState([]);
    const baseUrl = "http://localhost:3000/api/users/";

    useEffect(() => {
        async function fetchData() {
            await listUsers();
        }
        fetchData();
    }, []);

    function createUser(username, password, firstName, lastName, city, state) {       
        let user = {
            username,
            password,
            firstName,
            lastName,
            city,
            state
        };
        
        return axios.post(baseUrl, user)
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function signInUser(username, password) {
        let user = { username, password };
    
        return axios.post(`${baseUrl}signin`, user)
            .then(response => {
                localStorage.setItem('myPostToken', response.data.token)
                localStorage.setItem('userData', user.username)
                console.log(user.username)
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function listUsers() {
        return axios.get(baseUrl).then(response => setUser(response.data));
    }

    function getUser(id) {
        let url = baseUrl + id;
        console.log(url);

        return axios.get(url, user).then(response => {
            console.log(response.data)
            return new Promise(resolve => resolve(response.data))
        });
    }

    function editUser(user) {
        let url = baseUrl + `${user._id}`;
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myPostToken')}`
        };

        return axios.put(url, user, { headers: myHeaders })
            .then(response => {
                console.log(user);
                listUsers();
                console.log("you have edited your account!");

                return new Promise(resolve => resolve(response.data));
            }
        )
    }

    return (
        <UserContext.Provider value={{
            user,
            createUser,
            signInUser,
            getUser,
            editUser
        }}>
            { props.children }
        </UserContext.Provider>
    )
}
