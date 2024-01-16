import axios from 'axios';

class ChatService {

    getUserName(){
        return axios.get("/api/chatting", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    }

    getChatList(roomId){
        return axios.get("/api/group/chatList",{params: { room_id: roomId,}})
    }

    getPersonalChatList(roomId){
        return axios.get("/api/personal/chatList",{params: { room_id: roomId}})
    }
}

export default new ChatService();

