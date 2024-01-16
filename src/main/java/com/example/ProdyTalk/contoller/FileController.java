package com.example.ProdyTalk.contoller;

import com.example.ProdyTalk.mapper.FileMapper;
import com.example.ProdyTalk.service.FileService;
import com.example.ProdyTalk.vo.FileVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Date;
import java.util.List;
import java.util.Random;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class FileController {
    private final FileService fileService;

    @Autowired
    FileMapper fileMapper;

   @PostMapping("/api/fileupload")
    public void uploadFile(
            @RequestParam(value="files") MultipartFile[] uploadFile,
            @RequestParam(value="file_info") String fileInfo,
            @RequestParam(value="room_id") int roomId, Model model){
       //String uploadFolder = "E:\\storage";
       String uploadFolder = "/home/ubuntu/uploadFile";
       for(MultipartFile multipartFile : uploadFile) {
           String fileId = (new Date().getTime()) + "" + (new Random().ints(1000, 9999).findAny().getAsInt()); // 현재 날짜와 랜덤 정수값으로 새로운 파일명 만들기
           String originName = multipartFile.getOriginalFilename(); // ex) 파일.jpg
           String fileExtension = originName.substring(originName.lastIndexOf(".") + 1); // ex) jpg
           originName = originName.substring(0, originName.lastIndexOf(".")); // ex) 파일
           long fileSize = multipartFile.getSize(); // 파일 사이즈

           System.out.println("name=" + originName);
           System.out.println("size=" + fileSize);
           System.out.println("file_info=" + fileInfo);

           File savefile = new File(uploadFolder, fileId + "." + fileExtension);
           if(!savefile.exists()) {
               savefile.mkdirs();
           }

           try{
               multipartFile.transferTo(savefile);
           } catch (IOException e) {
               System.out.println(e.getMessage());
           }

           FileVO fileVO=new FileVO();
           fileVO.setFile_id(fileId);
           fileVO.setOrigin_name(originName);
           fileVO.setExtension(fileExtension);
           fileVO.setFile_size(fileSize);
           fileVO.setFile_info(fileInfo);
           fileVO.setRoom_id(roomId);

           fileService.insertFile(fileVO);
       }
   }

    @GetMapping("/filelist")
    public List<FileVO> getAllFiles(@RequestParam(value="room_id", required=false) int room_id) {

       return fileService.getAllFiles(room_id);
    }

    @PostMapping("/api/filedelete")
    public void deleteFile(@RequestBody FileVO fileVO){
       String file_id=fileVO.getFile_id();
       fileService.deleteFile(file_id);
    }

    @GetMapping("/filedownload")
    public void downloadFile(FileVO fileVO, HttpServletResponse response) throws IOException {

        String originName=fileVO.getOrigin_name()+"."+fileVO.getExtension();
        String fileName = fileVO.getFile_id()+"."+fileVO.getExtension();
        //String path="E:\\storage\\"+fileName;

        String path="/home/ubuntu/uploadFile/"+fileName;

        System.out.println(path);

        File file = new File(path);

        try(
            FileInputStream fis = new FileInputStream(file);
            BufferedInputStream bis = new BufferedInputStream(fis);
            OutputStream out = response.getOutputStream()
        ){
            // 응답이 파일 타입이라는 것을 명시
            response.addHeader("Content-Disposition", "attachment;filename=\""+originName+"\"");
            response.setContentType("application/x-download");
            // 응답 크기 명시
            response.setContentLength((int)file.length());

            int read = 0;

            // 실제 데이터 전송
            // OutputStream 의 Deafult 버퍼 사이즈는 8192 Byte
            // 이 루프를 8000 번 정도 돌때마다 약 8KB 정도의 데이터가 전송
            while((read = bis.read()) != -1) {
                out.write(read);
            }

        }catch(Exception ex){
            ex.printStackTrace();
        }
    }
}