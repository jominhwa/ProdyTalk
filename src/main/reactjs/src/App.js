import React from 'react';
import './App.css';
import Header from './components/Header'
import Main from './pages/MainPage'
import Signup from './pages/SignupPage'
import Login from './pages/LoginPage'

import ResultSignup from './pages/ResultSignup'
import ResultLogin from './pages/ResultLogin'

import { Route } from "react-router-dom";

function App() {
    return (
        <>
            <Header />
            <Route exact path="/" component={Main} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />

            <Route exact path="/signup/result" component={ResultSignup} />
            <Route exact path="/login/result" component={ResultLogin} />
        </>
    );
}

export default App;