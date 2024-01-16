package com.example.ProdyTalk.service;

import com.example.ProdyTalk.vo.RecruitVO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RecruitService {
    public List<RecruitVO> getAllRecruit(Integer recruit_id);
    public List<RecruitVO> getStudyRecruit(Integer recruit_id);
    public List<RecruitVO> getProjectRecruit(Integer recruit_id);
    public void createRecruit(RecruitVO recruit);
    public ResponseEntity<RecruitVO> getRecruit(Integer recruit_id);
    public void updateRecruit(RecruitVO updateRecruit);
    public void deleteRecruitByNo(RecruitVO recruit);
}
