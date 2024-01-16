import React, { Component } from 'react';
import UserService from '../service/UserService'
import { Link } from "react-router-dom";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import './css/Login.css';

//function LoginForm({ user_id, user_pwd, onChange,onCreate }) {
class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: '',
            user_pwd: '',
            isLoading: false,
        }

        this.handleIdChange = this.handleIdChange.bind(this)
        this.handlePwdChange = this.handlePwdChange.bind(this)
    }
    handleIdChange = (event) => {
        this.setState({ user_id: event.target.value });
    }
    handlePwdChange = (event) => {
        this.setState({ user_pwd: event.target.value })
    }
    gotoHome = (event) => {
            this.setState({ isLoading: true })
            event.preventDefault();
            let User = {
                user_id: this.state.user_id,
                user_pwd: this.state.user_pwd
            };
            axios
                  .post("/authenticate", User)
                  .then((response) => {
                    console.log(response);
                    console.log(response.data);
                    UserService.fetchToken(response.data);
                    localStorage.setItem("user", JSON.stringify(response.data));
                    this.props.history.push("/main");
                  })
                  .catch((error) => {
                    console.log("error");
                    window.alert("아이디나 비밀번호가 다릅니다")
                    this.setState({ isLoading: false })
                  });

        }
    render(){
        return (
            <div>
                { (this.state.isLoading == false)
                ? <form id="loginForm">
                    <h1 className="loginText">
                        로그인
                    </h1>
                    <div>
                        <div className="loginField">
                            <TextField
                                required
                                fullWidth
                                error={this.state.user_id === "" ? true: false}
                                id="outlined-required"
                                label="아이디"
                                onChange={this.handleIdChange}
                            />
                        </div>

                        <div className="passwordField">
                            <TextField
                                required
                                fullWidth
                                error={this.state.user_pwd === "" ? true: false}
                                id="outlined-required"
                                label="비밀번호"
                                type="password"
                                onChange={this.handlePwdChange}
                                type="password"
                            />
                        </div>

                         <div className="loginBtn">
                             <button type="submit" onClick={this.gotoHome} >로그인 하기</button>
                         </div>
                         <div className="signupBtn">
                             아직 계정이 없으신가요?
                             <a href="/signup">회원 가입</a>
                        </div>
                    </div>
                </form>

                : <div className="login_circular">
                    <p className="login_content"><CircularProgress /></p>
                  </div>
                }
            </div>
        );
    }
}
export default LoginComponent;