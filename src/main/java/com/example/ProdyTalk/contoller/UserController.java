package com.example.ProdyTalk.contoller;

import com.example.ProdyTalk.mapper.UserMapper;
import com.example.ProdyTalk.service.UserService;
import com.example.ProdyTalk.vo.UserVO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.util.Date;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @Autowired
    UserMapper userMapper;

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public void insertUser(@RequestBody UserVO user, HttpServletResponse response) throws IOException {
        userService.insertUser(user);
        System.out.println("유저 DB 저장 성공");
    }

    @PostMapping("/authenticate")
    public String authen(@RequestBody UserVO user){
        userService.findUser(user);
        System.out.println(user);
        System.out.println(userService.findUser(user));
        if (userService.findUser(user) != null) {
            System.out.println("유저 확인!!");

            Date now = new Date();

            return Jwts.builder()
                    .setHeaderParam(Header.TYPE, Header.JWT_TYPE) // (1)
                    .setIssuer("fresh") // (2)
                    .setIssuedAt(now) // (3)
                    .setExpiration(new Date(now.getTime() + Duration.ofMinutes(30).toMillis())) // (4)
                    .claim("id", user.getUser_id()) // (5)
                    .claim("pwd", user.getUser_pwd())
                    .signWith(SignatureAlgorithm.HS256, "secret") // (6)
                    .compact();

        } else {
            System.out.println("회원가입 안된 유저!!");
            throw new IllegalArgumentException("회원가입 안됨.");
        }
    }

    //토큰으로 유저 아이디 확인 => 아이디 넘기기
    @GetMapping("/authenticate")
    public Claims autheddn(HttpServletRequest request) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION).substring("Bearer ".length());

        return Jwts.parser()
                .setSigningKey("secret") // (3)
                .parseClaimsJws(token) // (4)
                .getBody();
    }

    @GetMapping("/api/getUser")
    public UserVO getUserById(@RequestParam(value="user_id") String user_id) {
        return userService.getUserById(user_id);
    }

    @PostMapping("/api/editUser")
    public void insertUser(@RequestBody UserVO userVO) {
        userService.editUser(userVO);
        System.out.println(userVO);
    }
}