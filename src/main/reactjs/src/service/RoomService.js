import axios from 'axios';

class RoomService {
    getRooms() {
        return axios.get("/roomlist", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    }

    createRoom(room_name, room_type, room_info) {
        return axios.post("/createroom", {
            room_name: room_name,
            room_type: room_type,
            room_info: room_info,
        },{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": 'application/json',
            },
        });
    }

    getRoomById(roomId){
        return axios.get("/api/getroom",{
            params: { room_id: roomId,}
        })
    }

    getMemberById(roomId){
        return axios.get("/api/getmember", {
            params: { room_id: roomId}
        })
    }

    deleteRoom(roomId){
        return axios.post("/api/deleteRoom", {
            room_id: roomId,
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": 'application/json',
                },
            });
    }
}

export default new RoomService();