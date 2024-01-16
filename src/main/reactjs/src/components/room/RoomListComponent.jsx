import React,{ useState, useEffect } from 'react';
import RoomService from '../../service/RoomService';
import RoomCircle from './RoomCircle.jsx';
import RoomCreate from './RoomCreate.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/Room.css';


function RoomListComponent() {

    const [rooms,setRooms]=useState(null)
    const [loading,setLoading]=useState(false)
    const [state,setState]=useState(false)
    const settings = {
          dots: true,
          infinite: false,
          speed: 500,
          slidesToShow: 6,
          slidesToScroll: 1,
          centerPadding: '0px',  // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
        }

    useEffect(() => {
        RoomService.getRooms().then((res) => {
            setRooms(res.data);
            setLoading(true)
        })
        setTimeout(()=>{if(rooms == null){ setLoading(true) }}, 2000)
    },[state]);


    return (
    <div className="roomlist">
        { loading == false
        ? <div className="circular"><CircularProgress /></div>
        : ( rooms ==null
            ? <h2 className="roomlist_nothing"> 참여한 방이 없습니다. 방을 생성, 참여해주세요 ! </h2>
            :  <div className="slider">
                <Slider {...settings}>
                    {rooms.map(room =>
                        <div><RoomCircle title={room.room_name} type={room.room_type} id={room.room_id} roomInfo={room.room_info}/></div>)
                    }

                </Slider>
            </div>
            )
        }

    </div>
    )

}

export default RoomListComponent;