import { useNavigate } from "react-router-dom";

const SignOut = () => {

    let navigate = useNavigate();

    function out() {
        return window.localStorage.clear()
    }

    function nav(event) {
        event.preventDefault();
        out().then(() => {
            
            navigate(`/signin`);
        }).catch(error => {
            console.log(error);
            navigate('/posts');
        });
    }
    return nav();
};

export default SignOut;