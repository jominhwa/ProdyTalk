import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import RoomService from '../../service/RoomService'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../css/RoomInfo.css'
import {useAsync} from 'react-async';

function InfoComponent(props) {
    const [total,setTotal]=useState("")
    const [member,setMember]=useState([])
    const [info,setInfo]=useState("")
    const [loading,setLoading]=useState(false)

    const getData = () => {
        return new Promise((resolve) => {
            RoomService.getRoomById(props.roomId)
                .then((res) => {
                    setTotal(res.data.room_total)
                    setInfo(res.data.room_info)
                    RoomService.getMemberById(props.roomId)
                        .then((res) => {
                            setMember(res.data)
                            resolve()
                        })
                })
            })
     }

     const onDeleteRoom = () => {
             if(window.confirm("정말 방을 나가시겠습니까?")){
                 RoomService.deleteRoom(props.roomId)

                 setTimeout(() => {
                     //window.location.href="http://localhost:3000/main"
                     window.location.href="https://prodytalk.icu:3000/main"
                 },1000);

             } else {
             }

         }

     useEffect(() => {
        setLoading(false)
        console.log("false")
        const connect = async() => {
            await getData()
                .then(() => {
                    setLoading(true)
                    console.log("true")

                })
        }
        connect()
     },[])

 return (
    <div style={{textAlign: 'center'}}>
    {
        loading === true
        ? <div className="infoBack">
            <div className="infoBigDiv">
                <div className="smallDiv">
                    <p className="total">팀원 인원수</p>
                    <p className="totalNum">{total}</p>
                </div>
                <div className="smallDiv">
                    <p className="total">팀원 아이디</p>
                    <p className="teamId"> {member.map(mem => (<li>{mem.user_id} <hr className="member" /></li>))}  </p>

                </div>
                <div className="smallDiv">
                    <p className="total">프로젝트 설명</p>
                    <p className="projectInfo">{info}</p>
                    <div className="deleteRoom">
                        <Button variant="contained" color="error" onClick={onDeleteRoom}>방 나가기</Button>
                    </div>

                </div>
            </div>

        </div>
        : <div>
            <CircularProgress />
        </div>

      }
    </div>
    );
}

export default InfoComponent;