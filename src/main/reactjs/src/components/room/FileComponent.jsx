import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import FileService from '../../service/FileService';
import FileList from './FileList';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { blue} from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import '../css/File.css'

function FileComponent(props) {
    const [fileList,setFileList] = useState(null);
    const [fileInfo,setFileInfo]=useState("");
    const [files,setFiles]=useState([]);
    const [loading,setLoading]=useState(false)
    const [state,setState]=useState(false)

    useEffect(() => {
        setLoading(false)
        FileService.getFiles(props.roomId).then((res) => {
            setFiles(res.data);
            setLoading(true)
        })

    },[state]);

    const changeState = () =>{
        setState(!state)
    }

    const onChangeFile =  (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setFileList(null)

      const uploadFiles = Array.prototype.slice.call(e.target.files);
      uploadFiles.forEach((uploadFile) => {
        setFileList(uploadFile)
        })
    }

     const uploadFile = () => {
        const formData = new FormData()

        if(fileInfo=="")
            window.alert("파일 정보를 입력해주세요!")
        else if(fileList==null)
            window.alert("파일을 추가해주세요!")
        else {
            console.log(fileList)
            formData.append('files', fileList);
            formData.append('file_info',fileInfo);
            formData.append('room_id',props.roomId);
            }

            axios.post('/api/fileupload',formData)
                .then(() => {
                    setState(!state)
                    window.alert("업로드 완료")
                })

     }

     const onFileInfo = (e) => {
        setFileInfo(e.target.value);
     }

     const ColorButton = styled(Button)(({ theme }) => ({
       color: blue[700],
       backgroundColor: 'white',
       '&:hover': {
         backgroundColor: blue[300],
       },
     }));

    return (
        <div style={{    height: "100%", "min-height": "493px"}}>
        { loading === true
        ? <div id="fileDiv">
            <br />
            {files.map(file =>
                <FileList name={file.origin_name} extension={file.extension} info={file.file_info}
                    id={file.file_id} size={file.file_size} propFunction={changeState}/>
            )}
            <br />
            <input type="file" multiple name="uploadFile" onChange={onChangeFile} id="fileInput" />
            <TextField
                style={{width:300}}
                required
                id="filled-basic"
                label="파일 정보"
                variant="standard"
                onChange={onFileInfo}
            />
            <ColorButton type="submit" variant="outlined" onClick={uploadFile}> 업로드 </ColorButton>
        </div>
        : <div className="file_circular">
            <p className="file_content"><CircularProgress /></p>
         </div>
        }
        </div>

    );
}

export default FileComponent;