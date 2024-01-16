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
import TextField from '@mui/material/TextField';
import '../css/Chat.css';

function Chat(props) {

    //const sock = new SockJS('http://localhost:8080/chat')
    const sock = new SockJS('https://prodytalk.icu:3000/chat')
    const client=Stomp.over(sock);

    const [list,setList]=useState(null)
    const [id,setId]=useState(null);
    const [userId,setUserId]=useState("");
    const [messageId,setMessageId]=useState(0);
    const [message,setMessage]=useState(null);
    const [children, setChildren]=useState([]);
    const [chatMessage,setChatMessage] = useState("");
    const [changeNum,setChangeNum]=useState(1)
    const [ScrollY, setScrollY] = useState(0);

    const handleFollow = () => {
        setScrollY(window.pageYOffset); // window 스크롤 값을 ScrollY에 저장
      }

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

    useEffect(() => {
        console.log("ScrollY is ", ScrollY); // ScrollY가 변화할때마다 값을 콘솔에 출력
      }, [ScrollY])

    useEffect(()=>{
        ChatService.getUserName().then(res => {
            setId(res.data.id) //id에 token id 넣기'
        })

        ChatService.getChatList(props.id).then(res => {
            setList(res.data)
        })

        client.connect({}, () =>{
            client.subscribe('/queue/addChatToClient/group/'+props.id, (messageVO) => { //
                setUserId(JSON.parse(messageVO.body).user_id)
                setMessage(JSON.parse(messageVO.body).content)
                setMessageId(JSON.parse(messageVO.body).message_id)
            })
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
            client.send(`/app/chat/group/${props.id}`,{},JSON.stringify({'user_id':id, 'content':chatMessage}))
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
        <div id="main-content" className="container">
            <div className="row">
                <div className="col-md-6">
                    <div id="chatList">
                        {children.map(child => child)}
                    </div>
                    <div id="inputMessage">
                        <TextField id="standard-basic" label="메시지 입력" variant="standard" onChange={changeMessage} value={chatMessage} />
                        <div className="inputButton">
                            <Button variant="contained" color="primary" onClick={onChatMessage}>보내기</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;