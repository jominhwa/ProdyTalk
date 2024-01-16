package com.example.ProdyTalk.service;

import com.example.ProdyTalk.mapper.RoomMapper;
import com.example.ProdyTalk.vo.RoomJoinVO;
import com.example.ProdyTalk.vo.RoomListVO;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServicelmpl implements RoomService {
    private final RoomMapper roomMapper;

    @Override //room_name, room_info, room_type을 넣어 방을 생성하는 메서드
    public void insertRoom(RoomListVO roomVO) {
        roomMapper.insertRoom(roomVO);
    }

    @Override //룸 정보들로 room_id 받아오는 메서드
    public int findIdRoom(RoomListVO roomVO) {
        return roomMapper.findIdRoom(roomVO);
    }

    @Override //roomJoin 테이블에 새로운 user-room 연결 추가
    public void joinRoom(RoomJoinVO room) {
        roomMapper.joinRoom(room);
        System.out.println(room);
    }

    @Override //모든 룸 리스트 불러오기
    public List<RoomListVO> getAllRooms() {
        return roomMapper.findAll();
    }


    @Override //user_id에 따른 룸 리스트 불러오기
    public List<RoomJoinVO> findInRoom(String user_id) {
        return roomMapper.findInRoom(user_id);
    }

    @Override
    public List<RoomListVO> getInRooms(int[] room_id) {
        return roomMapper.getInRooms(room_id);
    }

    @Override //룸의 현재 인원 가져오는 메서드
    public int getRoomTotal(int room_id) {
        return roomMapper.getRoomTotal(room_id);
    }

    @Override
    public void setRoomTotal(RoomListVO roomListVO) {
        roomMapper.setRoomTotal(roomListVO);
    }

    @Override
    public RoomListVO getRoomById(int room_id) {
        return roomMapper.getRoomById(room_id);
    }

    @Override
    public List<RoomJoinVO> getMemberById(int room_id){
        return roomMapper.getMemberById(room_id);
    }

    @Override
    public void deleteRoom(RoomJoinVO roomJoinVO) {
        roomMapper.deleteRoom(roomJoinVO);
    }
}