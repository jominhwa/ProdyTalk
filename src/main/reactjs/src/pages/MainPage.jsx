import React,{useState} from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import './css/mainPage.css'
import Header from '../components/HeaderComponent.jsx'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import RoomCircle from '../components/room/RoomCircle.jsx'
import RoomListComponent from '../components/room/RoomListComponent.jsx'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeIcon from '@mui/icons-material/Home';
import TextField from '@mui/material/TextField';
import CalendarIcon from "../components/image/calendar.png"
import RoomCreate from '../components/room/RoomCreate'
import base64 from 'base-64';
import axios from 'axios';

function MainPage({history}) {
    const [input,setInput] = useState("")

    const onChangeLink = (e) => {
        setInput(e.target.value)
    }

    const onLink = () => {
        if(input=="") window.alert("코드를 입력해주세요!")
        else {
            axios.get(base64.decode(input), {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            window.alert("방 참여완료!")
            window.location.reload();
            setInput("")
        }
    }

    useEffect(() => {
        return history.listen((location) => {
            if(history.action === "POP"){
                history.push("/")
            }
        })

    },[window.history])


    return (
        <div className="mainPage">
            <div className="smallBox">
            <Header />
                <div id="putLink">
                    <TextField id="standard-basic" label="코드 입력" variant="standard" onChange={onChangeLink} />
                    <div className="putLinkButton">
                        <Button variant="outlined" color="primary" onClick={onLink}>참여</Button>
                    </div>
                </div>
                <br/><br/><br/>
            </div>

                <div>
                     <div id="myroomlist">마이룸</div>
                    <hr style={{ height: '5px', color: '#97aaca', opacity: '1', margin: '0 1000px 0 25px', width: '450px' }}></hr>
                    <RoomListComponent />
                </div>
                <br />
                <div className="menu">
                    <RoomCreate />
                    <Link to="/recruit" style={{ textDecoration: 'none', color:'black' }} >
                         <div className="recruit">
                             <PeopleAltIcon fontSize="large" /><br />
                             모집게시판
                         </div>
                    </Link>
                    <Link to="/myCalendar" style={{ textDecoration: 'none', color:'black' }}>
                        <div className="myCalendar">
                            <img src={CalendarIcon} alt="CalendarIcon" width= "25px"/><br />
                            스케줄
                        </div>
                    </Link>
                    <Link to="/mypage" style={{ textDecoration: 'none', color:'black' }}>
                        <div className="mypage">
                            <HomeIcon fontSize="large" /><br />
                            마이페이지
                        </div>
                    </Link>
                </div>
        </div>
    );
}

export default MainPage;