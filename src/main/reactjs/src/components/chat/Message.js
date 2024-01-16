import React from 'react';

function Message(props) {

    return (
    <div className="message">
        <div className="balloon" >
            {props.id}: {props.content}
        </div>
    </div>
    );
}

export default Message;