package com.example.ProdyTalk.vo;

import lombok.Data;

import java.util.Date;

@Data
public class ToDoListVO {
    int todolist_id;
    String user_id;
    String content;
    int room_id;
    boolean checked;
}
