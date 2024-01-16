package com.example.ProdyTalk.contoller;

import com.example.ProdyTalk.service.RecruitService;
import com.example.ProdyTalk.vo.RecruitVO;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
public class RecruitController {

    @Autowired
    private RecruitService recruitService;

    // get all recruit
    @GetMapping("/recruit")
    public List<RecruitVO> getAllRecruits(Integer recruit_id) {
        return recruitService.getAllRecruit(recruit_id);
    }

    // get study recruit
    @GetMapping("/recruit/study")
    public List<RecruitVO> getStudyRecruits(Integer recruit_id) {
        return recruitService.getStudyRecruit(recruit_id);
    }

    // get project recruit
    @GetMapping("/recruit/project")
    public List<RecruitVO> getProjectRecruits(Integer recruit_id) {
        return recruitService.getProjectRecruit(recruit_id);
    }

    @PostMapping("/recruit")
    public void createRecruit(@RequestBody RecruitVO recruit) {

        //어떤 유저가 게시글 작성하는 건지 token을 이용해 user_id 알아내기
        // String token = request.getHeader(HttpHeaders.AUTHORIZATION).substring("Bearer ".length());
        // String user_id = Jwts.parser().setSigningKey("secret").parseClaimsJws(token).getBody().get("id",String.class);
        // System.out.println(recruit.getRecruit_id() + "   "+ user_id);
        
        recruitService.createRecruit(recruit);
    }

    // get one recruit
    @GetMapping("/recruit/{recruit_id}")
    public ResponseEntity<RecruitVO> getRecruitByNo(@PathVariable Integer recruit_id) {
        return recruitService.getRecruit(recruit_id);
    }

    // update recruit
    @PostMapping("/recruit/update")
    public void updateRecruitByNo(@RequestBody RecruitVO recruit) {
        recruitService.updateRecruit(recruit);
    }

    @PostMapping("/recruit/delete")
    public void deleteRecruitByNo(@RequestBody RecruitVO recruit) {
        recruitService.deleteRecruitByNo(recruit);
    }
}
