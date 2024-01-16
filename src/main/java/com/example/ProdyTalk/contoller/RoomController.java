package com.example.ProdyTalk.contoller;

import com.example.ProdyTalk.mapper.RoomMapper;
import com.example.ProdyTalk.service.RoomService;
import com.example.ProdyTalk.vo.RoomJoinVO;
import com.example.ProdyTalk.vo.RoomListVO;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;

    @Autowired
    RoomMapper roomMapper;

    @PostMapping("/createroom")
    public void insertUser(@RequestBody RoomListVO room, HttpServletRequest request) {
        room.setRoom_total(1);
        roomService.insertRoom(room);
        System.out.println("Room DB 저장 성공");

        int room_id = roomService.findIdRoom(room);  //방 id 가지고 오기

        //어떤 유저가 방을 만드는 건지 token을 이용해 유저id 알아내기
        String token = request.getHeader(HttpHeaders.AUTHORIZATION).substring("Bearer ".length());
        String user_id = Jwts.parser().setSigningKey("secret").parseClaimsJws(token).getBody().get("id",String.class);
        System.out.println(room_id + "   "+ user_id);

        RoomJoinVO join = new RoomJoinVO();
        join.setRoom_id(room_id);
        join.setUser_id(user_id);

        roomService.joinRoom(join);
    }

    @GetMapping("/roomlist")
    public List<RoomListVO> getAllRooms(HttpServletRequest request) {

        String token = request.getHeader(HttpHeaders.AUTHORIZATION).substring("Bearer ".length());
        String user_id = Jwts.parser().setSigningKey("secret").parseClaimsJws(token).getBody().get("id",String.class);

        List<RoomJoinVO> room_ids = roomService.findInRoom(user_id);
        int[] room_id=new int[room_ids.size()];

        for (int i=0; i<room_ids.size(); i++) {
            room_id[i]=room_ids.get(i).getRoom_id();
        }

        return roomService.getInRooms(room_id);
    }

    @GetMapping("/api/enterRoom")
    public void enterRoom(@RequestParam("roomId") int room_id,
                          HttpServletResponse response,
                          HttpServletRequest request ) throws IOException {
        System.out.println("룸 아이디는"+room_id);

        String token = request.getHeader(HttpHeaders.AUTHORIZATION).substring("Bearer ".length());
        String user_id = Jwts.parser().setSigningKey("secret").parseClaimsJws(token).getBody().get("id",String.class);

        RoomJoinVO roomJoinVO = new RoomJoinVO();
        roomJoinVO.setRoom_id(room_id);
        roomJoinVO.setUser_id(user_id);
        roomService.joinRoom(roomJoinVO);

        RoomListVO roomListVO = new RoomListVO();
        int room_total = roomService.getRoomTotal(room_id);
        roomListVO.setRoom_id(room_id);
        roomListVO.setRoom_total(room_total+1);

        roomService.setRoomTotal(roomListVO);
        response.sendRedirect("http://prodytalk.icu:3000/main");
        //response.sendRedirect("http://localhost:3000/main");
    }

    @GetMapping("/api/getroom")
    public RoomListVO getRoomById(@RequestParam(value="room_id") int room_id) {
        return roomService.getRoomById(room_id);
    }

    @GetMapping("/api/getmember")
    public List<RoomJoinVO> getMemberById(@RequestParam(value="room_id") int room_id) {
        return roomService.getMemberById(room_id);
    }

    @PostMapping("/api/deleteRoom")
    public void deleteRoom(@RequestBody RoomJoinVO roomJoinVO, HttpServletRequest request){
        RoomListVO roomListVO = new RoomListVO();
        int room_total = roomService.getRoomTotal(roomJoinVO.getRoom_id());
        roomListVO.setRoom_id(roomJoinVO.getRoom_id());
        roomListVO.setRoom_total(room_total-1);

        String token = request.getHeader(HttpHeaders.AUTHORIZATION).substring("Bearer ".length());
        String user_id = Jwts.parser().setSigningKey("secret").parseClaimsJws(token).getBody().get("id",String.class);
        roomJoinVO.setUser_id(user_id);

        roomService.setRoomTotal(roomListVO);
        roomService.deleteRoom(roomJoinVO);
    }

}