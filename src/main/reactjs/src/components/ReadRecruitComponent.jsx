import React, { Component } from 'react';
import RecruitService from '../service/RecruitService'
import './css/Recruit.css';
import Back from "./image/Back.png";
import ChatPage from "./chat/PersonalChatComponent";
import Chat from './image/Chat.png';

import UserService from '../service/UserService'

class ReadRecruitComponent extends Component {
    constructor(props) {
        super(props)
        // 상세보기에 사용될 파라미터 정의
        this.state = {
            recruit_id: this.props.match.params.recruit_id,
            recruit: {},
            roleCondition: false,
            isModalOn: false,
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this)
    }

        // 페이지 로딩될 때 api와 통신해 글 객체 가져옴
        componentDidMount() {
            RecruitService.getOneRecruit(this.state.recruit_id).then((res) => {
                this.setState({ recruit: res.data });
                this.getRoleCondition(this.state.recruit.user_id);
            });
            // UserService에서 user_id 가져오기
            UserService.getUserName().then(res => {
                this.setState({
                    user_id: res.data.id,
                })

                this.getRoleCondition(this.state.user_id); // 로그인 한 user_id 검사 위해
            })
        }

        // 수정, 삭제 권한 있는 지 검사
        getRoleCondition(write_id, login_id) {
            if(this.state.recruit.user_id == this.state.user_id) {
                this.setState({
                    roleCondition: true,
                })
            }
            else {
                this.setState({
                    roleCondition: false,
                })
            }

        }

        // 파라미터 값에 따라 페이지에 표시할 내용 변경
        // 게시글 타입별(스터디/프로젝트)로 표시 다르게 함
        returnRecruitType(typeNo) {
            let type = null;
            if(typeNo == '스터디') {
                type = "Study";
            }
            else if(typeNo == '프로젝트') {
                type = "Project"

            }
            else {
                type = "타입 미지정"; // 수정하기 (자유게시판 등)
            }

            return (
                <div className="readRow">
                    <label className="category"> {type} </label>
                </div>
            )
        }

        /*
        returnDate(cTime, uTime) {
            return (
                <div className = "row">
                    <label>생성일 : [ {cTime} / 최종 수정일 : [ {uTime} ]</label>
                </div>
            )
        }
        */

        // 글 목록으로 이동하는 함수 정의
        goToList() {
            this.props.history.push("/recruit");
        }

        // 글 수정으로 이동
        goToUpdate = (event) => {
            if(this.state.roleCondition) {
                event.preventDefault();
                this.props.history.push(`/createRecruit/${this.state.recruit_id}`);
            }
            else {
                alert("※ 본인만 글을 수정할 수 있습니다");
            }
        }

        openModal(){
            this.setState({isModalOn:true})

        };

        closeModal() {
            this.setState({isModalOn: false})
        };

        deleteView = async function () {
            if(this.state.roleCondition) {
                if(window.confirm("글을 삭제하시겠습니까?\n삭제된 글은 복구 할 수 없습니다.")) {
                    RecruitService.deleteRecruit(this.state.recruit_id).then( res => {
                        console.log("delete result => " + JSON.stringify(res));

                        if(res.status == 200) {
                            this.props.history.push('/recruit');
                        }
                        else {
                            alert("글 삭제를 실패했습니다.");
                        }
                    });
                }
            }

            else {
                alert("※ 본인만 글을 삭제할 수 있습니다");
            }
        }

    render() {
        const imagestyle = {
            height:45,
            width:45
        };

        const imagestyle2 = {
            height:30,
            width:30
        };

        return (
            <div>
                <div className="readRecruit">
                     <ChatPage id={this.state.recruit_id} open={this.state.isModalOn} close={this.closeModal}  header="채팅"> </ChatPage>
                    <div>
                        {this.returnRecruitType(this.state.recruit.room_type)}
                        <h1> {this.state.recruit.title}</h1>
                            <button id="chatBtn" onClick={this.openModal}>
                                <img src={Chat} style={imagestyle2}/>
                            </button>
                            <div className = "readRow" id="author">
                                <label> 작성자 : {this.state.recruit.user_id} </label>
                                <label style={{marginLeft:"15px"}}> {this.state.recruit.date} </label>
                                <label style={{marginLeft:"55px"}}><a onClick={this.goToUpdate}>수정</a></label>
                                <label><a onClick={() => this.deleteView()}>삭제</a></label>
                            </div>

                            <div className = "readRow">
                                    <label className="contentLabel"><pre style={{whiteSpace: "pre-wrap"}}>{this.state.recruit.content}</pre></label>
                            </div >

                            <button id="floatingBtn" onClick={this.goToList.bind(this)}><img src={Back} style={imagestyle}/></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReadRecruitComponent;