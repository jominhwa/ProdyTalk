import axios from 'axios';

class CalendarService {

    getCalendar(roomId) {
        return axios.get("/calendar",{params: { room_id: roomId,}});
    }

    addEvent(content,startDate,endDate,color,roomId) {
        axios.post("/calendar/add", {
            title: content,
            start: startDate,
            end: endDate,
            color: color,
            room_id: roomId,
        })
    }

    editEvent(calId, editTitle, startDate, endDate, color) {
        axios.post("/calendar/edit", {
            calendar_id : calId,
            title : editTitle,
            start: startDate,
            end: endDate,
            color: color
        })
    }

    deleteEvent(calId) {
        axios.post("/calendar/delete", {
            calendar_id : calId
        })
    }

    // 개인 캘린더
    getMyCalendar(userId) {
        return axios.get("/myCalendar", {params: { user_id : userId, }});
    }

    addMyEvent(content,startDate,endDate,color,userId) {
        axios.post("/myCalendar/add", {
            title: content,
            start: startDate,
            end: endDate,
            color: color,
            user_id: userId,
        })
    }

    editMyEvent(calId, editTitle, startDate, endDate, color) {
        axios.post("/myCalendar/edit", {
            calendar_id : calId,
            title : editTitle,
            start: startDate,
            end: endDate,
            color: color
        })
    }

    deleteMyEvent(calId) {
        axios.post("/myCalendar/delete", {
            calendar_id : calId
        })
    }
}

export default new CalendarService();