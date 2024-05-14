import React from 'react';
import './SignInPage.scss';
import SignInForm from '../../components/SignInForm/SignInForm';
import loginBg from '../../assets/images/loginbg.jpg';

const SignInPage = () => {
    return (
<div className="sign">
  <div className="sign__items">
    <h1 className="sign__title">Sign In</h1>
    <SignInForm /> 
  </div>
  <div className="sign__hero">
    <img className="sign__img" src={loginBg} alt="login bg"/>
  </div>
</div>

    );
};

export default SignInPage;
