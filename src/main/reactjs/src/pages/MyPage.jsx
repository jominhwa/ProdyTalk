import {React,useEffect} from 'react';
import {useState} from 'react';
import { Link,withRouter } from "react-router-dom";
import Header from '../components/HeaderComponent'
import Button from '@mui/material/Button';
import UserService from '../service/UserService.js';
import basicProfile from '../components/image/basicProfile.png';
import CircularProgress from '@mui/material/CircularProgress';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MyPageModal from './MyPageModal';
import { blue } from '@mui/material/colors';
import Home from "../components/image/Home.png";
import './css/myPage.css'
function MyPage() {

    const [userId,setUserId]=useState("")
    const [userPwd,setUserPwd] = useState("");
    const [userName,setUserName] = useState("")
    const [userEmail,setUserEmail] = useState("")
    const [userPhone,setUserPhone] = useState("")
    const [loading,setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true); // modal open
    };

    const closeModal = () => {
        setModalOpen(false); // modal close
    };

        const addModal = (user_id,user_pwd,user_name,user_email,user_phone) => {
            UserService.editUser(user_id,user_name,user_pwd,user_email,user_phone)

            setModalOpen(false); // Modal 닫아주기
            window.alert("수정 완료!")
        };


    const getData = () => {
        return new Promise((resolve) => {
            UserService.getUserName().then(res => {
                UserService.getUserById(res.data.id)
                    .then((res) => {
                        setUserId(res.data.user_id)
                        setUserPwd(res.data.user_pwd)
                        setUserName(res.data.user_name)
                        setUserEmail(res.data.user_email)
                        setUserPhone(res.data.user_phone)
                        setLoading(false)
                    })
            })
        })
    }

    const homeImageStyle = {
                 height:45,
                 width:45
             };

    const imagestyle = {
                 height:150,
                 width:150,
                 marginTop:50,
                 marginBottom:10
        };

    useEffect(() => {
        getData()
    },)
                    //<div className="userId"><KeyIcon sx={{fontSize: 40, marginRight:1, color: '#2c3e50'}} />  비밀번호 : {userPwd}</div>
    return (
    <div>
        <div style={{height: '100vh', textAlign: 'center'}}>
            <Header />
            { loading === true
            ? <div className="circular"><CircularProgress /></div>
            :<div className="box">
            <div id="mypage">마이페이지</div>
            <hr style={{ height: '5px', color: '#97aaca', opacity: '1', margin: '0 1000px 0 25px', width: '450px' }}></hr>
                <div className="miniBox"></div>
                <MyPageModal userId={userId} open={modalOpen} close={closeModal} propFunction={addModal} header="마이페이지 정보수정"> </MyPageModal>
                <p className="basicProfile">
                    <br /> {userId}님, 안녕하세요!</p>
                <div className="infoBox">
                    <div className="userId"><AccountCircleIcon sx={{fontSize: 40, marginRight:1, color: '#2c3e50'}} />  아이디 : {userId}</div>
                    <div className="userId"><BadgeIcon sx={{fontSize: 40, marginRight:1, color: '#2c3e50'}} />  이름 : {userName}</div>
                    <div className="userId"><EmailIcon sx={{fontSize: 40, marginRight:1, color: '#2c3e50'}} />  이메일 : {userEmail}</div>
                    <div className="userId"><LocalPhoneIcon sx={{fontSize: 40, marginRight:1, color: '#2c3e50'}} />  핸드폰 : {userPhone}
                        <div className="editButton"><Button variant="outlined" size="large" onClick={openModal}><p className="editButton">수정</p></Button></div>
                    </div>

                    <MyPageModal userId={userId} userPwd={userPwd} userName={userName} userEmail={userEmail} userPhone={userPhone} open={modalOpen} close={closeModal} propFunction={addModal} header="마이페이지 정보수정"> </MyPageModal>

                 </div>
                 <Link to="/main" id="homeBtn"><img src={Home} style={homeImageStyle}/></Link>
            </div>
            }

        </div>

    </div>
    );
}

export default withRouter(MyPage);