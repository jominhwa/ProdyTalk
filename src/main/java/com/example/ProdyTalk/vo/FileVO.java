package com.example.ProdyTalk.vo;

import lombok.Data;

@Data
public class FileVO {
    String file_id;
    String origin_name;
    String extension;
    long file_size;
    String file_info;
    String user_id;
    int room_id;
}