import React from 'react';
import { useRef, useState, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import CalendarService from '../service/CalendarService';
import moment from 'moment';
import DetailModal from '../components/calendar/DetailModal'
import Modal from '../components/calendar/Modal'
import UserService from '../service/UserService'
import './css/calendar.css'

function MyCalender(props) {
    const[userId, setUserId] = useState('');
    const [events, setEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const[calId, setCalId] = useState(0);

    // 날짜 setting
    const[start, setStart] = useState('');

    const[title, setTitle] = useState('');

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    // DetailModal용
    // open인 경우만 Modal 열림
    const [detailModalOpen, setDetailModalOpen] = useState(false);

    const openDetailModal = () => {
        setDetailModalOpen(true); // detail modal open
    };

    const closeDetailModal = () => {
        setDetailModalOpen(false); // detail modal close
    };

    // Modal에서 add 버튼 클릭 시 실행
    const addModal = (content, startDate, endDate, color) => {
        CalendarService.addMyEvent(content, startDate, endDate, color, userId); // events에 전달받은 이벤트 추가해주기
        setModalOpen(false); // Modal 닫아주기
    };

    // DetailModal에서 수정 버튼 클릭 시 실행
    const editEvent = (editTitle, startDate, endDate, color) => {
        CalendarService.editMyEvent(calId, editTitle, startDate, endDate, color); // events에 수정할 calId, title 전달
        setDetailModalOpen(false); // Modal 닫아주기
    };

    // DetailModal에서 삭제 버튼 클릭 시 실행
    const deleteEvent = () => {
        console.log(calId);
        console.log('를 삭제');

        CalendarService.deleteMyEvent(calId); // 삭제할 event id 전달
        setDetailModalOpen(false); // Modal 닫아주기
    };

    useEffect(()=> {
        CalendarService.getMyCalendar(userId).then((res) => {
            setEvents(res.data)
        });

        UserService.getUserName().then(res => {
            setUserId(res.data.id)
        })
    }, [events]);

    useEffect(() => {
        console.log(title);
    }, [title]);

  return (
    <div className="MyCalender">

          <Modal open={modalOpen} close={closeModal} start={start} propFunction={addModal} header="일정을 입력해주세요." />
            <DetailModal open={detailModalOpen} close={closeDetailModal} title={title} propFunction={editEvent} propFunction2={deleteEvent} header="Event 수정/삭제" />

            <FullCalendar
                contentHeight="auto" // 스크롤바 제거

                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth" // 기본 : 월 달력
                headerToolbar={{ // 월, 주, 일 버튼 클릭 시 달력 보기 변경
                    center: 'dayGridMonth,timeGridWeek,timeGridDay new',
                }}

                displayEventTime={false}

                customButtons = {{
                new : {
                    text : "new",

                    click : function() {
                        openModal();
                    }
                    }
                }}
        events={events} // event 전달


        eventColor="gray"
        nowIndicator
        // dateClick={(e) => console.log(e.dateStr)}
        // eventClick={(e) => console.log(e.event.id)}

        dateClick={ (e) => {
            setStart(e.dateStr);

            openModal()
          }
        }

        eventClick={ (e) => {
            // events 배열에서 선택한 event
            var temp = events.find(function(data){ return (data.title==e.event.title)&&(data.start==moment(e.event.startStr).format("YYYY-MM-DD"))});

            const calId = temp.calendar_id // 선택한 event의 calendar_id
            setCalId(calId)

            var tempStart = events.find(function(date) { return (date.start==moment(e.event.startStr).format("YYYY-MM-DD"))});
            setTitle(e.event.title)

            openDetailModal()
          }
        }

      />
    </div>
  ); // return 끝
}

export default MyCalender