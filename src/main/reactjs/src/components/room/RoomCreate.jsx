import Fab from '@mui/material/Fab';
import {React,useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import RoomModal from "./RoomModal";
import { styled } from '@mui/material/styles';
import RoomService from '../../service/RoomService';
import '../css/Modal.css';

function RoomCreate(props) {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true); // modal open
    };

    const closeModal = () => {
        setModalOpen(false); // modal close
    };

    const addModal = (room_name, room_type, room_info) => {
        RoomService.createRoom(room_name,room_type,room_info)
        setModalOpen(false); // Modal 닫아주기

        window.location.reload();
    };

    return (
        <div style={{display: 'inline'}}>
            <RoomModal open={modalOpen} close={closeModal} propFunction={addModal} header="새로운 Room 생성">
            </RoomModal>

            <div id="openmodal" onClick={openModal}>
                <AddIcon fontSize="large" /><br />
                방만들기
            </div>
        </div>
    );
}
export default RoomCreate;
