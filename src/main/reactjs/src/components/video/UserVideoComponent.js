import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
//import './UserVideo.css';
import { AudioMutedOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import '../css/Video.css';

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }
    render() {
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                    <div className="streamcomponent">
                        <OpenViduVideoComponent streamManager={this.props.streamManager} />
                        <div className="video-username"><p>{this.getNicknameTag()}</p></div>
                        <div className="video-audiostate">{this.props.streamManager.stream.audioActive ? null : <AudioMutedOutlined />}</div>
                    </div>
                ) : null}
            </div>
        );
    }
}