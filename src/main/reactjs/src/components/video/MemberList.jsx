import React, { Component } from 'react';

export default class MemberList extends Component {

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }


    render() {
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                    <div className="member"><p>{this.getNicknameTag()}</p></div>
                ) : null}
            </div>
        );
    }
}