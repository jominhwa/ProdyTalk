import React from 'react';
import {useState, useEffect} from 'react';
import '../components/css/Modal.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const MyPageModal = (props) => {

  // open, close, Modal header 텍스트를 모로부터 받아옴
  const { userId, userPwd, userName, userEmail, userPhone, open, close, add, header } = props;

  // const [userPwd,setUserPwd] = useState("");
  const [changeNum, setChangeNum] = useState(1);

  const[editPwd, setEditPwd] = useState("");
  const[editName, setEditName] = useState("");
  const[editEmail, setEditEmail] = useState("");
  const[editPhone, setEditPhone] = useState("");

  const changeUserPwd = (e) => {
    setEditPwd(e.target.value);
  }

  const changeUserName = (e) => {
    setEditName(e.target.value);
  }

  const changeUserEmail = (e) => {
    setEditEmail(e.target.value);
  }

  const changeUserPhone = (e) => {
    setEditPhone(e.target.value);
  }
  const addEvent = () => {
    setChangeNum(changeNum+1); // add 버튼 누를 때 마다 changeNum + 1 해주기

    props.propFunction(userId,editPwd,editName,editEmail,editPhone); // 바뀐 값 전달
    setEditPwd("");
    setEditName("");
    setEditEmail("");
    setEditPhone("");
  }

  useEffect(() => {
    setEditPwd("");
    setEditName("");
    setEditEmail("");
    setEditPhone("");
  }, [changeNum]);

  useEffect(() => {
    if(userPwd!=''){ setEditPwd(userPwd);}
    if(userName!=''){ setEditName(userName);}
    if(userEmail!=''){ setEditEmail(userEmail);}
    if(userPhone!=''){ setEditPhone(userPhone);}
  }, [userPwd, userName, userEmail, userPhone]);

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

                    <label htmlFor="taskId" className="col-form-label" style={{marginTop: '50px'}}>아이디</label>
                    <input type="text" className="form-control" value={userId} disabled style={{textAlign: 'center'}}/>
                    
                    <label htmlFor="taskId" className="col-form-label">비밀번호</label>
                    <input type="text" onChange={changeUserPwd} className="form-control" value={editPwd} id="user_pwd" name="user_pwd" style={{textAlign: 'center'}}/>

                    <label htmlFor="taskId" className="col-form-label">이름</label>
                    <input type="text" onChange={changeUserName} className="form-control" value={editName} id="user_name" name="user_name" style={{textAlign: 'center'}}/>

                    <label htmlFor="taskId" className="col-form-label">이메일</label>
                    <input type="text" onChange={changeUserEmail} className="form-control" value={editEmail} id="user_email" name="user_email" style={{textAlign: 'center'}}/>

                    <label htmlFor="taskId" className="col-form-label">핸드폰</label>
                    <input type="text" onChange={changeUserPhone} className="form-control" value={editPhone} id="user_phone" name="user_phone" style={{textAlign: 'center'}}/>
                </div>
              </div>
              <footer>
                <button className="add" onClick={addEvent}>
                  수정
                </button>
                <button className="close" onClick={close}>
                  닫기
                </button>
              </footer>

            </section>
          ) : null}
        </div>
  );
}

export default MyPageModal;