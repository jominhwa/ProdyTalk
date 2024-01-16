import React from 'react';
import './App.css';
import Header from './components/HeaderComponent'
import FirstPage from './pages/FirstPage'
import MyPage from './pages/MyPage'
import Main from './pages/MainPage'
import LoginComponent from './components/LoginComponent'
import SignupComponent from './components/SignupComponent'
import RoomEnter from './pages/RoomEnter'
import Video from './components/video/VideoRoomComponent'
import VideoSetting from './components/video/VideoSetting'
import Chat from './components/chat/GroupChatComponent'
import Calendar from './pages/Calendar'
import { Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListRecruitComponent from './components/ListRecruitComponent'
import CreateRecruitComponent from './components/CreateRecruitComponent'
import ReadRecruitComponent from './components/ReadRecruitComponent'
import MySchedule from './pages/MySchedule'

function App() {
  return (
        <div>

           <Route exact path="/" component={FirstPage} />
           <Route exact path="/first/:isLogin" component={FirstPage} />
           <Route exact path="/main" component={Main} />
           <Route exact path="/signup" component={SignupComponent} />
           <Route exact path="/login" component={LoginComponent} />
           <Route exact path="/roomenter/:id" component={RoomEnter} />
           <Route exact path="/video/setting/:id" component={VideoSetting} />
           <Route exact path="/video/:id" component={Video} />
           <Route exact path="/chat" component={Chat} />
           <Route exact path="/calendar" component={Calendar} />
           <Route exact path="/mypage" component={MyPage} />
           <Route exact path="/recruit" component={ListRecruitComponent} />
           <Route exact path="/createRecruit/:recruit_id" component={CreateRecruitComponent} />
           <Route exact path="/readRecruit/:recruit_id" component={ReadRecruitComponent} />
           <Route exact path="/myCalendar" component={MySchedule} />
        </div>

    );
}

export default App;