import axios from 'axios';
import React from 'react';

class ToDoListService {

    getTodoListById(roomId) {
        return axios.get("/api/todolist/id", {
            params: { room_id: roomId}
        })
    }

    setChecked(id, check) {
        return axios.post("/api/todolist/checked", { todolist_id: id, checked: check })
    }

    addToDoList(content,roomId){
        return axios.post("/api/todolist/add",{ content: content, room_id: roomId })
    }

    deleteToDoList(id){
        return axios.post("/api/todolist/delete",{ todolist_id: id})
    }

    //이 밑으로 마이투두리스트

    getTodoListByUser(username){
        return axios.get("/api/todolist/user", {
            params: { user_id: username }
        })
    }

    addToDoListByUser(content, username){
        return axios.post("/api/todolist/addByUser", { content: content, user_id: username })
    }
}

export default new ToDoListService();