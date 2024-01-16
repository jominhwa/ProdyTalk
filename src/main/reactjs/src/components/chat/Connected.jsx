import React from 'react';
import '../css/Chat.css';

function Connected(props) {
    return (
    <div>
        <div id="connected">
            {props.id}님이 연결되었습니다!
        </div>
        <br />
    </div>
    )
}

export default Connected;