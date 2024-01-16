package com.example.ProdyTalk.service;

import com.example.ProdyTalk.mapper.RoomMapper;
import com.example.ProdyTalk.mapper.ToDoListMapper;
import com.example.ProdyTalk.vo.ToDoListVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ToDoListServicelmpl implements ToDoListService{
    private final ToDoListMapper toDoListMapper;

    @Override
    public List<ToDoListVO> getToDoListById(int room_id) {
        return toDoListMapper.getToDoListById(room_id);
    }

    @Override
    public void setChecked(ToDoListVO toDoListVO) {
        toDoListMapper.setChecked(toDoListVO);
    }

    @Override
    public void addToDoList(ToDoListVO todoListVO) {
        toDoListMapper.addToDoList(todoListVO);
    }

    @Override
    public void deleteToDoList(ToDoListVO todoListVO){
        toDoListMapper.deleteToDoList(todoListVO);
    }

    @Override
    public List<ToDoListVO> getToDoListByUser(String user_id) {
        return toDoListMapper.getToDoListByUser(user_id);
    }

    @Override
    public void addToDoListByUser(ToDoListVO todoListVO) {
        toDoListMapper.addToDoListByUser(todoListVO);
    }
}
