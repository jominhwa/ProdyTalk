import {React,useState} from "react";
import {useEffect} from 'react';
import TodoListItem from './todolist/TodoListItem'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ToDoListService from '../service/ToDoListService';
import ToDoListModal from './todolist/ToDoListModal';

function TodoListComponent(props) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const week = ['일','월','화','수','목','금','토']
    const dayOfWeek = week[now.getDay()];
    const [modalOpen, setModalOpen] = useState(false);
    const [todolist,setToDoList] = useState([]);
    const [checked, setChecked] = useState(false);


    const openModal = () => {
        setModalOpen(true); // modal open
    };

    const closeModal = () => {
        setModalOpen(false); // modal close
    };

    const addModal = (content) => {
        setModalOpen(false); // Modal 닫아주기
        ToDoListService.addToDoList(content,props.roomId)
            .then(()=> setChecked(!checked))
    };

    const handleChecked = () => {
        setChecked(!checked)
    }

    useEffect(() => {
        ToDoListService.getTodoListById(props.roomId).then((res) => {
            setToDoList(res.data)
            console.log(res.data)
        })
    },[checked]);


    return (
    <div className="todolist">
        <ToDoListModal open={modalOpen} close={closeModal} propFunction={addModal} header="투두리스트 추가"> </ToDoListModal>

        <div className="todolist_header">
            <p className="todolist_title">{year}년 {month}월 {date}일</p>
            <p className="todolist-day">{dayOfWeek}요일</p>
            <p className="todolist-num">할일 {todolist.length}개 남음</p>
        </div>
        <div className="todolist_add">
            <Fab color="primary" aria-label="add" onClick={openModal}>
                <AddIcon />
            </Fab>
        </div>
        <hr className="todolist_hr"/>

        <div className="todolist_false">
        {todolist
            .map(data => <TodoListItem checked={data.checked} id={data.todolist_id} content={data.content} propFunction={handleChecked}/>)
        }
        </div>



    </div>
    );
}

export default TodoListComponent;