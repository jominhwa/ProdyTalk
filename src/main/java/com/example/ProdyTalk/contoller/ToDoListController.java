package com.example.ProdyTalk.contoller;

import com.example.ProdyTalk.mapper.RoomMapper;
import com.example.ProdyTalk.mapper.ToDoListMapper;
import com.example.ProdyTalk.service.RoomService;
import com.example.ProdyTalk.service.ToDoListService;
import com.example.ProdyTalk.vo.RoomListVO;
import com.example.ProdyTalk.vo.ToDoListVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class ToDoListController {
    private final ToDoListService toDoListService;

    @Autowired
    ToDoListMapper toDoListMapper;

    @GetMapping("/api/todolist/id")
    public List<ToDoListVO> getToDoListById(@RequestParam(value="room_id") int room_id) {
        return toDoListService.getToDoListById(room_id);
    }

    @PostMapping("/api/todolist/checked")
    public void setChecked(@RequestBody ToDoListVO toDoListVO){
        toDoListService.setChecked(toDoListVO);
    }

    @PostMapping("/api/todolist/add")
    public void addToDoList(@RequestBody ToDoListVO toDoListVO){
        toDoListVO.setChecked(false);
        toDoListService.addToDoList(toDoListVO);
    }

    @PostMapping("/api/todolist/delete")
    public void deleteToDoList(@RequestBody ToDoListVO toDoListVO){
        toDoListService.deleteToDoList(toDoListVO);
    }

    @GetMapping("/api/todolist/user")
    public List<ToDoListVO> getToDoListByUser(@RequestParam(value="user_id") String user_id) {
        return toDoListService.getToDoListByUser(user_id);
    }

    @PostMapping("/api/todolist/addByUser")
    public void addToDoListByUser(@RequestBody ToDoListVO toDoListVO){
        toDoListVO.setChecked(false);
        toDoListService.addToDoListByUser(toDoListVO);
    }

}
