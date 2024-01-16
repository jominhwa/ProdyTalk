package com.example.ProdyTalk.service;

import com.example.ProdyTalk.vo.RoomJoinVO;
import com.example.ProdyTalk.vo.RoomListVO;

import java.util.List;

public interface RoomService {

    //전체 방 데이터
    public void insertRoom(RoomListVO room);

    public int findIdRoom(RoomListVO room);

    //유저 속해있는 방 데이터
    public void joinRoom(RoomJoinVO room);

    public List<RoomListVO> getAllRooms();

    public List<RoomJoinVO> findInRoom(String user_id);
    //유저가 속해있는 방 리스트 불러오기
    public List<RoomListVO> getInRooms(int[] room_id);

    public int getRoomTotal(int room_id);

    public void setRoomTotal(RoomListVO roomListVO);

    public RoomListVO getRoomById(int room_id);

    public List<RoomJoinVO> getMemberById(int room_id);

    public void deleteRoom(RoomJoinVO roomJoinVO);
}