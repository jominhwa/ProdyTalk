package com.example.ProdyTalk.chat.vo;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class MessageVO {

    int message_id;
    String time;
    String content;
    String user_id;
    int conversation_id;

}
