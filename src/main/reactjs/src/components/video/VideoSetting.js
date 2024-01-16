import React, { Component } from 'react';
import axios from 'axios';
import { Link, useLocation, useHistory } from 'react-router-dom';
import UserService from '../../service/UserService';
import VideoService from '../../service/VideoService';
import Logo from '../image/LogoWhite.png';
import { UserOutlined, AudioMutedOutlined} from '@ant-design/icons';
import { Avatar } from 'antd';
import '../css/Video.css';



class VideoSetting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mySessionId: 'MySessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            videoDeviceID: undefined,
            audioDeviceID: undefined,
            videoDevices: [],
            audioDevices: [],
            videoEnable: true,
            audioEnable: true,
            videoRef: undefined,
        };
        this.handleClick = this.handleClick.bind(this);
        this.setAudio = this.setAudio.bind(this);
        this.setVideo = this.setVideo.bind(this);
        this.getWebcam = this.getWebcam.bind(this);
        this.handleVideoSelect = this.handleVideoSelect.bind(this);
        this.handleAudioSelect = this.handleAudioSelect.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
    }
    componentDidMount() {
        const { params } = this.props.match;
        UserService.getUserName().then(res => {
            this.setState({
                myUserName: res.data.id,
                mySessionId: params.id,
            });
        });


        this.videoRef = React.createRef();
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                const videoinput = devices.filter((device) => device.kind === "videoinput");
                const audioinput = devices.filter((device) => device.kind === "audioinput");
                this.setState({
                     videoDevices: videoinput,
                     audioDevices: audioinput,
                     videoDeviceID: videoinput[0],  //일단 맨 videoDevices 맨 처음 껄로 저장
                     audioDeviceID: audioinput[0],
                });
            });
            this.getWebcam((stream => {
                this.videoRef.current.srcObject = stream;
                this.videoRef.current.play();
        }));
        window.addEventListener('beforeunload', this.onbeforeunload);
    }


    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
    }

    onbeforeunload(event) {
        console.log("onbeforeunload");
    }

    handleClick() {
         //const history = useHistory();
        this.props.history.push({
           pathname: "/video/"+this.state.mySessionId,
           props: {
                    myUserName : this.state.myUserName,
                    mySessionId : this.state.mySessionId,
                    videoDeviceID : this.state.videoDeviceID,
                    audioDeviceID : this.state.audioDeviceID,
                    videoEnable : this.state.videoEnable,
                    audioEnable : this.state.audioEnable,
           }
         });
    }

    setVideo() {
        if(this.state.videoEnable === true){
            this.setState({
                videoEnable: false,
            });
            this.videoRef.current.srcObject = null;
        }
        else{
            this.setState({
                videoEnable: true,
            });
            this.getWebcam((stream => {
                this.videoRef.current.srcObject = stream;
                this.videoRef.current.play();
                console.log(stream);
            }));
        }


    }

    setAudio() {
        if(this.state.audioEnable === true){
            this.setState({
                audioEnable: false,
            });
        }
        else{
            this.setState({
                audioEnable: true,
            });
        }
    }
    handleVideoSelect(e) {
        console.log(e.target.value);
        this.setState({
            videoDeviceID: e.target.value,
        });
    }

    handleAudioSelect(e){
        e.preventDefault();
        console.log(e.target.value);
        this.setState({
            audioDeviceID: e.target.value,
        });
    }

    getWebcam(callback) {
      try {
        const constraints = {
          'video': true,
          'audio': true
        }
        navigator.mediaDevices.getUserMedia(constraints)
          .then(callback);
      } catch (err) {
        console.log(err);
        return alert(err + ': 카메라, 마이크 허용해주세요!!');
      }
    }





    render() {
        const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName;
        const audioDevices = this.state.audioDevices;
        const videoDevices = this.state.videoDevices;
        let video;
        if(this.state.videoEnable === false){
            video = <div className="video-off">
                        <Avatar size={120} icon={<UserOutlined />} />
                        {this.state.audioEnable ? null : <AudioMutedOutlined /> }
                    </div>;
        }
        else if(this.state.videoEnable === true){
            video = <div className="video-on">
                        <video ref={this.videoRef} />
                        {this.state.audioEnable ? null : <AudioMutedOutlined /> }
                    </div>;
        }

        return (
            <div className="container">
                    <div id="join">
                        <div id="logo-img">
                            <Link to="/main"><img src={Logo} alt="ProdyTalk logo"/></Link>
                        </div>
                        <br />
                        <div id="join-dialog" className="jumbotron vertical-center">
                            <form className="form">
                                {video}
                                <div>
                                    <input
                                        type="button"
                                        id="buttonSetAudio"
                                        onClick={this.setAudio}
                                        value={this.state.audioEnable ? "음소거" : "음소거 해제"}
                                    />
                                    <input
                                        type="button"
                                        id="buttonSetVideo"
                                        onClick={this.setVideo}
                                        value={this.state.videoEnable ? "카메라 끄기" : "카메라 켜기"}
                                    />
                                </div>
                                <p>
                                    <label>Camera: </label>
                                    <select value={this.state.videoDeviceID} onChange={this.handleVideoSelect}>
                                        {videoDevices.map((videoDevice, index) => (
                                            <option key={videoDevice.deviceId} value={videoDevice.deviceId}>
                                                {videoDevice.label}
                                            </option>
                                         ))}
                                    </select>
                                </p>
                                <p>
                                    <label>Audio: </label>
                                    <select value={this.state.audioDeviceID} onChange={this.handleAudioSelect}>
                                        {audioDevices.map((audioDevice, index) => (
                                            <option key={audioDevice.deviceId} value={audioDevice.deviceId}>
                                                {audioDevice.label}
                                            </option>
                                         ))}
                                    </select>
                                </p>
                                <p>
                                    <label>Username: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="userName"
                                        value={myUserName}
                                        disabled
                                    />
                                </p>
                                <p>
                                    <label> Session: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="sessionId"
                                        value={mySessionId}
                                        disabled
                                    />
                                </p>
                                <p className="text-center">
                                    <input
                                        className="btn btn-lg btn-success"
                                        id="buttonJoin"
                                        type="button"
                                        value="JOIN"
                                        onClick={this.handleClick}/>
                                </p>
                            </form>
                        </div>
                    </div>
            </div>
        );
    }
    }
export default VideoSetting;