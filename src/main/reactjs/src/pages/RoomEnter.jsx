import React, { useState, useEffect } from 'react';
import { Link, useLocation,useHistory } from "react-router-dom";
import GroupChatComponent from '../components/chat/GroupChatComponent';
import FileComponent from '../components/room/FileComponent'
import InfoComponent from '../components/room/InfoComponent'
import ToDoListComponent from '../components/TodoListComponent'
import TextEditorComponent from '../components/textEditor/TextEditorComponent'
import Calendar from './Calendar';
import Header from '../components/HeaderComponent'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Button from '@mui/material/Button';
import Home from "../components/image/Home.png";
import base64 from 'base-64';
import RoomService from "../service/RoomService";
import './css/RoomEnter.css';

function RoomEnter() {

    const location=useLocation()
    const history=useHistory()
    console.log(location)
    console.log(history)
    const id=location.state.id
    const prevPage = location.state.prevPage

    const [chat,setChat]=useState(false)
    const [calendar,setCalendar]=useState(false)
    const [file,setFile]=useState(false)
    const [link,setLink]=useState(false)
    const [info,setInfo]=useState(false)
    const [todolist,setToDoList]=useState(false)
    const [editor,setEditor]=useState(false)
    const [value, setValue] = useState(0);
    const [buttonText,setButtonText]=useState("코드 보기")
    const inviteLink = "/api/enterRoom?roomId="+id
    const encodeLink = base64.encode(inviteLink)
    const [project,setProject]=useState("")


    useEffect(() => {
        console.log(history)
        if(prevPage === 'VideoChat'){
            console.log("VideoChat")
            if(window.name != 'reload'){
                window.name='reload';
                window.location.reload(true);

            }
            else window.name='';
        }
        history.listen((location) => {
            if(history.action === "POP"){
                window.location.reload()
            }
        })
    },[history])
    useEffect(() => {
        RoomService.getRoomById(id)
            .then((res) => {
                setProject(res.data.room_name)
            })
        if(value === 0){
            setInfo(true)
            setCalendar(false)
            setFile(false)
            setChat(false)
            setToDoList(false)
            setEditor(false)
        }else if(value === 1){
            setInfo(false)
            setCalendar(true)
            setFile(false)
            setChat(false)
            setToDoList(false)
            setEditor(false)
        }else if(value === 2) {
            setInfo(false)
            setCalendar(false)
            setFile(true)
            setChat(false)
            setToDoList(false)
            setEditor(false)
        }else if(value === 3){
            setInfo(false)
            setCalendar(false)
            setFile(false)
            setChat(true)
            setToDoList(false)
            setEditor(false)
        }else if(value === 5){
            setToDoList(true)
            setCalendar(false)
            setFile(false)
            setChat(false)
            setInfo(false)
            setEditor(false)
        }else if(value === 6){
            setEditor(true)
            setToDoList(false)
            setCalendar(false)
            setFile(false)
            setChat(false)
            setInfo(false)
        }
    },[value])


    const homeImageStyle = {
        height:45,
        width:45
    };

    const onCopy = () => {
        if(buttonText==="코드 보기"){
            setLink(true);
            setButtonText("코드 복사");
        }
        else if(buttonText==="코드 복사"){
            navigator.clipboard.writeText(encodeLink)
            window.alert("코드가 복사되었습니다!")
        }
    }

    console.log(`${id}번 방입니다!`)


    return(
        <div className="roomEnterBack">
            <Header />
            <div className="roomName">
                프로젝트명 : {project}
            </div>
            <div id="inviteLink">
                { (link === true)
                ?
                <div className="showLink">
                    {encodeLink}
                </div>
                : <div></div>
                }
                <div className="copyButton">
                    <Button variant="outlined" color="primary" onClick={onCopy}>{buttonText}</Button>
                </div>
            </div>


            <Box className="navigator">
                  <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  >
                    <BottomNavigationAction label="프로젝트/스터디 정보" />
                    <BottomNavigationAction label="캘린더" />
                    <BottomNavigationAction label="파일 공유"  />
                    <BottomNavigationAction label="그룹 채팅"  />
                    <BottomNavigationAction component={Link} to={{pathname:`/video/setting/${id}`, state: `${id}`}} label="화상 채팅"  />
                    <BottomNavigationAction label="ToDoList" />
                  </BottomNavigation>
            </Box>
            <div id="menu">
                <div className="menuitem">
                    {file && <FileComponent roomId={id} />}
                </div>
                <div className="chat">
                     {chat && <GroupChatComponent id={id}/>}
                </div>

                <div>
                    {(info == true)
                    ? <InfoComponent roomId={id} />
                    : <p></p>
                    }
                </div>

                <div>
                {(calendar == true)
                ?<div className="menu_calendar">
                    <div className="menu_content">
                        <Calendar roomId={id}/>
                    </div>
                 </div>
                :<div></div>
                }
                </div>


                <div className="todolist_enter">
                    {todolist&&<ToDoListComponent roomId={id} />}
                </div>
                <div className="textEditor_enter">
                    {editor&&<TextEditorComponent roomId={id} />}
                </div>
            </div>

        <Link to="/main" id="homeBtn"><img src={Home} style={homeImageStyle}/></Link>
        </div>
    )
}

export default RoomEnter