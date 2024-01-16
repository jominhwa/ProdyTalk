import React,{useEffect} from 'react';
import {useState} from 'react';
import '../css/Modal.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const RoomModal = (props) => {

  // open, close, Modal header 텍스트를 모로부터 받아옴
  const { open, close, add, header } = props;

  const[roomName, setRoomName] = useState('');
  const[roomType, setRoomType] = useState('프로젝트');
  const[roomInfo, setRoomInfo] = useState('');
  const[changeNum, setChangeNum] = useState(1);

  const changeRoomName = (e) => {
    setRoomName(e.target.value);
  }

  const changeRoomType = (e) => {
    setRoomType(e.target.value);
  }

  const changeRoomInfo = (e) => {
    setRoomInfo(e.target.value);
  }

  const addEvent = () => {
    setChangeNum(changeNum+1); // add 버튼 누를 때 마다 changeNum + 1 해주기

    props.propFunction(roomName,roomType,roomInfo); // 바뀐 값 전달
    setRoomName("");
    setRoomType("");
    setRoomInfo("");
  }

  return (
     // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modal' : 'modal'}>
          {open ? (
            <section>
              <header>
                {header}
                <button className="close" onClick={close}>
                </button>
              </header>

              <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="taskId" className="col-form-label">방 이름</label>
                    <input type="text" onChange={changeRoomName} className="form-control" value={roomName} id="room_name" name="room_name"/>
                     <FormControl>
                        <label htmlFor="taskId" className="col-form-label" id="roomType">방 종류</label>
                          <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={roomType}
                            onChange={changeRoomType}
                          >
                            <FormControlLabel value="프로젝트" control={<Radio />} label="프로젝트" />
                            <FormControlLabel value="스터디" control={<Radio />} label="스터디" />
                          </RadioGroup>
                     </FormControl>
                     <br />
                     <label htmlFor="taskId" className="col-form-label" id="roomInfo">방 정보</label>
                     <input type="text" onChange={changeRoomInfo} className="form-control" value={roomInfo} id="room_info" name="room_info"/>

                </div>
              </div>

              <footer>
                <button className="add" onClick={addEvent}>
                  add
                </button>
                <button className="close" onClick={close}>
                  close
                </button>
              </footer>
            </section>
          ) : null}
        </div>
  );
};

export default RoomModal;