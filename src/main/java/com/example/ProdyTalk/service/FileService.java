package com.example.ProdyTalk.service;

import com.example.ProdyTalk.vo.FileVO;

import java.util.List;

public interface FileService {
    public void insertFile(FileVO fileVO);
    public List<FileVO> getAllFiles(int room_id);
    public void deleteFile(String file_id);
}
