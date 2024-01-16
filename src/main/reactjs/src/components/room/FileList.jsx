import React from 'react';
import Button from '@mui/material/Button';
import FileService from '../../service/FileService';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import '../css/Modal.css'

function FileList(props) {

    const onDownload = () => {
        FileService.fileDownload(props.id,props.extension,props.size,props.name)
    }

    const onDelete = () => {
        console.log(props.id);
        FileService.fileDelete(props.id)
            .then(() => {
                props.propFunction()
            })
    }

    return (
        <div id="fileDown">
            {props.name}.{props.extension} : {props.info}
            <Button variant="contained" color="primary" onClick={onDownload}> 다운로드</Button>
            <IconButton aria-label="delete" size="large" onClick={onDelete}>
                    <DeleteIcon fontSize="inherit" />
            </IconButton>
            <br />
        </div>
    )
}

export default FileList;