package com.example.ProdyTalk.vo;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class UserVO {
    String user_id;
    String user_pwd;
    String user_name;
    String user_email;
    String user_phone;
}
