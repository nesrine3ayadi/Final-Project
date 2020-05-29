import React, {useState} from "react";
import "./Register.scss";
import axios from "axios";
import { withRouter } from "react-router-dom";


function Register(props) {
    const [exist, setExist] = useState("")
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        imageUser: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bca91b5a-7127-45f9-8892-c6fde43ffb8c/d8zy2yu-cd50751d-9351-490b-8290-daf808f6af2b.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYmNhOTFiNWEtNzEyNy00NWY5LTg4OTItYzZmZGU0M2ZmYjhjXC9kOHp5Mnl1LWNkNTA3NTFkLTkzNTEtNDkwYi04MjkwLWRhZjgwOGY2YWYyYi5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.lgsfD-ZImPrjQIHKlk1bWVsuAYM4Qx3dn5JWzEvbnsI",
        imageCover: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/gamer-red-youtube-channel-art-banner-design-template-c960102d5418d78435ad333f1638c9d6_screen.jpg?ts=1561461377",
        dataOfBirth: "",
        aboutUser: "",
        country: "",
        activate: true,
        banned: false,
        createdAt: Date.now(),
        role: "user"

    });
    const add = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/", user).then(response => {
            console.log("the status is:", response.status);
            if (response.status === 200) {
                props.history.push("/login");
               
            };
        }).catch(err => {
            setExist("user already exist , try another email  !")
            setUser({
                ...user,
                password: "",
                email: "",
                confirmPassword: ""
            })
        });;


    };
    return (
        <div>
            <div className="container">
                <div className="form">
                    <div className="sign-in-section"
                        style={
                            {paddingTop: 100}
                    }>
                        <h1>Sign Up</h1>
                        <ul>
                            <li>
                                <i className="fab fa-facebook-f"></i>
                            </li>
                            <li>
                                <i className="fab fa-linkedin-in"></i>
                            </li>
                            <li>
                                <i className="fab fa-twitter"></i>
                            </li>
                        </ul>
                        <p>or use your email</p>
                        <form>
                            <div className="form-field">
                                <label for="username">Username</label>
                                <input id="email" type="text" placeholder="Username"
                                    value={
                                        user.username
                                    }
                                    onChange={
                                        (e) => setUser({
                                            ...user,
                                            username: e.target.value
                                        })
                                    }/>
                            </div>
                            <div className="form-field">
                                <label for="email">Email</label>
                                <input id="email" type="email" placeholder="Email"
                                    value={
                                        user.email
                                    }
                                    onChange={
                                        (e) => setUser({
                                            ...user,
                                            email: e.target.value
                                        })
                                    }/>
                            </div>
                            <div className="form-field">
                                <label for="password">Password</label>
                                <input id="password" type="password" placeholder="Password"
                                    value={
                                        user.password
                                    }
                                    onChange={
                                        (e) => setUser({
                                            ...user,
                                            password: e.target.value
                                        })
                                    }/>
                            </div>
                            <div className="form-field">
                                <label for="password">Confirm Password</label>
                                <input id="password" type="password" placeholder="confirm Password"
                                    value={
                                        user.confirmPassword
                                    }
                                    onChange={
                                        (e) => setUser({
                                            ...user,
                                            confirmPassword: e.target.value
                                        })
                                    }/>
                            </div>
                            <div className="form-options">
                                <div className="checkbox-field">
                                    <input id="rememberMe" type="checkbox" className="checkbox"/>
                                    <label for="rememberMe">Remember Me</label>
                                </div>
                                <a href="#">Forgot Password?</a>
                            </div>
                            <div className="form-field">
                                <input type="submit" className="btn btn-signin" value="Submit"
                                    onClick={add}/>
                            </div>
                        </form>
                        <div className="links">
                            {/* <a href="#">Privacy Policy</a>
                            <a href="#">Terms & Conditions</a> */}
                            {exist} </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Register);
