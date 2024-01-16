package com.example.ProdyTalk.contoller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class TextEditorController {

    @PostMapping("/api/texteditor/change")
    public void changeText(@RequestBody String text) {
        System.out.println(text);
    }
//    @GetMapping("/api/texteditor/get")
//    public String getText() {
//        return "어케하냐";
//    }
}
