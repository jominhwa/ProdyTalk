import axios from 'axios';

class FileService {
    getFiles(roomId) {
        return axios.get("/filelist",{params: { room_id: roomId }});
    }

    fileDownload(fileId,extension,size,name) {
        //window.location.href='http://localhost:8080/filedownload?file_id=${fileId}&extension=${extension}&file_size=${size}&origin_name=${name}';
        window.location.href='https://prodytalk.icu:3000/filedownload?file_id=${fileId}&extension=${extension}&file_size=${size}&origin_name=${name}';
//         axios.get("/filedownload",{
//             file_id: fileId,
//             extension: extension,
//             file_size: size,
//             origin_name: name,
//             })
    }

    fileDelete(fileId) {
        return axios.post("/api/filedelete",{ file_id: fileId })
    }
}

export default new FileService();