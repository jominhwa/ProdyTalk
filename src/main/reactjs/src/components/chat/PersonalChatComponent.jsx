import React,{useEffect} from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Message from "./Message.js";
import LeftMessage from "./LeftMessage.js";
import Connected from "./Connected";
import ChatService from "../../service/ChatService.js";
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import '../css/Modal.css';

import '../css/Chat.css';

function PersonalChatComponent(props) {


    //const sock = new SockJS('http://localhost:8080/chat')
    const sock = new SockJS('https://prodytalk.icu:3000/chat')
    const client=Stomp.over(sock);
    const {open, close, header} = props;
    const [list,setList]=useState(null)
    const [id,setId]=useState(null);
    const [userId,setUserId]=useState("");
    const [messageId,setMessageId]=useState(0);
    const [message,setMessage]=useState(null);
    const [children, setChildren]=useState([]);
    const [chatMessage,setChatMessage] = useState("");
    const [changeNum,setChangeNum]=useState(1)

    const changeMessage = (e) => {
        setChatMessage(e.target.value);
        }; //input 입력시 chatMessage state 변경

    const onChangeNum = () => {
        setChangeNum(changeNum+1)
    }

    const waitForConnection = (client, callback) => {
        setTimeout(() => {
            if(client.ws.readyState === 1) callback()
            else waitForConnection(client,callback)
        }, 1)
    }


    useEffect(()=>{
        ChatService.getUserName().then(res => {
            setId(res.data.id) //id에 token id 넣기'
        })

        ChatService.getPersonalChatList(props.id).then(res => {
            setList(res.data)
        })

        client.connect({}, () =>{
            client.subscribe('/queue/addChatToClient/personal/'+props.id, (messageVO) => { //
                setUserId(JSON.parse(messageVO.body).user_id)
                setMessage(JSON.parse(messageVO.body).content)
                setMessageId(JSON.parse(messageVO.body).message_id)
            }) //글 번호로 구독!
        })



        return () => {
            client.disconnect(()=>{
                client.unsubscribe('sub-0');
            })
        }
    }, [])


    useEffect(() => {
        if(id!=null){
            setChildren([
                ...children,
                <Connected id={id} />
            ])
        } else {
            <CircularProgress />
        }
    },[id])

    useEffect(() => {
        if(list!=null){
            const tempArray = []

            list.forEach(listItem => {
                if(listItem.user_id === id){
                    tempArray.push([
                        <Message id={listItem.user_id} content={listItem.content} />,
                        <br /> ])
                }else {
                    tempArray.push([
                        <LeftMessage userId={listItem.user_id} content={listItem.content} />,
                        <br /> ])
                }
            })
            setChildren([
                ...children,
                tempArray
            ])


        }
    },[list])



    const onChatMessage = () => {
        waitForConnection(client,function() {
            client.send(`/app/chat/personal/${props.id}`,{},JSON.stringify({'user_id':id, 'content':chatMessage}))
            //conversationId로 메세지를 보내면서, user_id와 content, 방번호 포함
            setChildren([
                ...children,
                <Message id={id} content={chatMessage} />, //보냄과 동시에 화면에 내가보낸 메시지 내용 오른쪽에 표시
                <br />
            ])
        })

        setChatMessage("")
    }

    useEffect(() => {
        if(userId!=null&&message!=null){
            if(userId!=id){
                setChildren([
                    ...children,
                    <LeftMessage userId={userId} content={message} />, //메시지가 오면 왼쪽에 표시
                    <br />
                ])
            }
        }
    },[messageId])


    return (
        <div className={props.open ? 'openModal modal' : 'modal'}>
            {props.open ? (
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={close}>
                        </button>
                    </header>

            <div className="modal-body">
                <div className="form-group">
                    <div id="chatList">
                        {children.map(child => child)}
                    </div>
                    <div id="inputMessage">
                        <label>메시지 입력</label>
                        <input className="obj" onChange={changeMessage} value={chatMessage} placeholder="message.." />
                        <Button variant="contained" color="primary" onClick={onChatMessage}>보내기</Button>
                    </div>
                </div>
            </div>
            <footer>
                <button className="close" onClick={close}>
                    닫기
                </button>
            </footer>
        </section>
        )
        : null
        }

        </div>
    );
}

export default PersonalChatComponent;