import React, { Component } from 'react';
import UserService from '../service/UserService'
import './css/Signup.css';

class SignupComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: '',
            user_pwd: '',
            user_name: '',
            user_email: '',
            user_phone: ''
        }

        this.handleIdChange = this.handleIdChange.bind(this)
        this.handlePwdChange = this.handlePwdChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
    }
    handleIdChange = (event) => {
        this.setState({ user_id: event.target.value });
    }
    handlePwdChange = (event) => {
        this.setState({ user_pwd: event.target.value })
    }
    handleNameChange = (event) => {
        this.setState({ user_name: event.target.value });
    }
    handleEmailChange = (event) => {
        this.setState({ user_email: event.target.value });
    }
    handlePhoneChange = (event) => {
        this.setState({ user_phone: event.target.value });
    }
    gotoLogin = (event) => {
        if(!this.state.user_id) {
            alert("아이디는 필수 항목입니다.");
        }
        else if(!this.state.user_pwd) {
            alert("비밀번호는 필수 항목입니다.");
        }
        else if(!this.state.user_name) {
            alert("닉네임은 필수 항목입니다.");
        }

        else {
                event.preventDefault();
                let User = {
                    user_id: this.state.user_id,
                    user_pwd: this.state.user_pwd,
                    user_name: this.state.user_name,
                    user_email: this.state.user_email,
                    user_phone: this.state.user_phone
                };
                UserService.Signup(User).then(res => {
                    this.props.history.push({
                        pathname:`/first/${true}`,
                        state:`${true}`
                    })
                    window.alert("회원가입에 성공했습니다")
                });
        }
    }
    render() {
        return (
            <div>
                <form id="signupForm">
                <h1 className="signupText">
                    회원가입
                </h1>
                     <div className="id">
                         <label>아이디 (*)</label>
                     </div>
                     <div className="field">
                         <input
                            className="loginInp"
                            required="required"
                            type="text"
                            name="user_id"
                            placeholder="  아이디"
                            autofocus="autofocus"
                            onChange={this.handleIdChange}
                         />
                     </div>

                     <div className="textLabel">
                         <label>비밀번호 (*)</label>
                     </div>
                     <div className="field">
                         <input
                            className="loginInp"
                            required="required"
                            type="text"
                            name="user_pwd"
                            placeholder="  비밀번호"
                            onChange={this.handlePwdChange}
                         />
                     </div>
                     <div className="textLabel">
                         <label>닉네임 (*)</label>
                     </div>
                     <div className="field">
                         <input
                            className="loginInp"
                            required="required"
                            type="text"
                            name="user_name"
                            placeholder="  닉네임"
                            onChange={this.handleNameChange}
                         />
                     </div>
                     <div className="textLabel">
                          <label>이메일</label>
                     </div>
                     <div className="field">
                          <input
                            className="loginInp"
                             type="email"
                             name="user_email"
                             placeholder="  이메일"
                             onChange={this.handleEmailChange}
                          />
                     </div>
                     <div className="textLabel">
                          <label>전화번호</label>
                     </div>
                     <div className="field">
                          <input
                            className="loginInp"
                             type="text"
                             name="user_phone"
                             placeholder="  전화번호"
                             onChange={this.handlePhoneChange}
                          />
                      </div>
                     <div className="signupBtn">
                         <button type="submit" onClick={this.gotoLogin}>회원가입</button>
                     </div>
                </form>
            </div>
        );
    }
}

export default SignupComponent;