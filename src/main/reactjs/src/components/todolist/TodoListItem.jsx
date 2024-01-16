import {useState,useEffect} from 'react';
import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import ToDoListService from '../../service/ToDoListService'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import '../css/ToDoList.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function TodoListItem(props) {
    const [checked, setChecked] = useState(props.checked);

    const handleChange = (e) => {
        setChecked(e.target.checked);
    }

    const onDelete = () => {
        if(window.confirm("삭제하시겠습니까?")){
            ToDoListService.deleteToDoList(props.id)
                .then(() => props.propFunction())
        }
    }

    useEffect(() => {
        if(checked == true){
            ToDoListService.setChecked(props.id, true)
                .then(() => props.propFunction())
        } else {
            ToDoListService.setChecked(props.id, false)
                .then(() => props.propFunction())
        }

        console.log(props.id+"번째 아이템의 checked는"+props.checked)
    },[checked])

    return (
    <div className="todolist_item">
        {(props.checked == true)
        ? <Checkbox
            {...label}
            defaultChecked
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            onChange={handleChange}
         />
        :<Checkbox
            {...label}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            onChange={handleChange}
         />
        }


        {(checked === true)
        ? <p className="todolist_gray">{props.content}</p>
        : <p className="todolist_content">{props.content}</p>
        }

        <div className="todolist_delete">
            <IconButton aria-label="delete" size="large" onClick={onDelete}>
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </div>
    </div>
    );
}

export default TodoListItem;