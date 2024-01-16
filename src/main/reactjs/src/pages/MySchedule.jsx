import React, { useState } from 'react';
import {useLocation} from 'react-router-dom';
import {useEffect} from 'react';
import { Link } from "react-router-dom";
import Header from '../components/HeaderComponent'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Button from '@mui/material/Button';
import Home from "../components/image/Home.png";
import MyCalendar from "./MyCalendar";
import MyTodolist from "../components/MyToDoList"
import base64 from 'base-64';
import './css/mySchedule.css';

function MySchedule() {

const [value, setValue] = useState(0);
const [calendar,setCalendar] = useState(true);
const [toDoList,setToDoList] = useState(false);

const homeImageStyle = {
        height:45,
        width:45
    }

useEffect(() => {
    if(value == 0) {
        setCalendar(true)
        setToDoList(false)
    } else{
        setToDoList(true)
        setCalendar(false)
    }

})


return(
    <div className="mySchedule">
        <Header />

        <Box className="navigator">
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
            <BottomNavigationAction label="캘린더" />
            <BottomNavigationAction label="ToDoList" />
            </BottomNavigation>
        </Box>

        <div>
        { (calendar == true)
        ? <div className="mySchedule_calendar">
            <div className="mySchedule_content">
                <MyCalendar />
            </div>
         </div>
        :<div></div>
        }
        </div>

        <div>
        {(toDoList == true)
        ? <div className="mySchedule_todolist">
            <MyTodolist />
         </div>
        : <div></div>
        }
        </div>


        <Link to="/main" id="homeBtn"><img src={Home} style={homeImageStyle}/></Link>
    </div>

    )
}

export default MySchedule;