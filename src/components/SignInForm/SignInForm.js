import React, { useState } from 'react';
import axios from 'axios';
import './SignInForm.scss';

const SignInForm = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/signin', userData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form__email">
                <input className="form__email-input" type="email" name="email" placeholder="Email" onChange={handleChange} />
            </div>
            <div className="form__password">
                <input className="form__password--input" type="password" name="password" placeholder="Password" onChange={handleChange} autoComplete="current-password" />
            </div>
            <div className="form__button">
                <button className="form__btn" type="submit">Sign In</button>
            </div>    
        </form>
    );
};

export default SignInForm;
