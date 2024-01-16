import React,{useEffect} from 'react';
import {useState} from 'react';
import {ColorPicker, useColor} from "react-color-palette";
import '../css/Modal.css';

const DetailModal = (props) => {

    const { open, close, add, header, start, title } = props;

    const[changeNum, setChangeNum] = useState(1);
    const[editTitle, setEditTitle] = useState('');
    const[startDate, setStartDate] = useState('');
    const[endDate, setEndDate] = useState('');
    const[color, setColor] = useColor("hex", "#121212");

    const changeStart = (e) => {
        setStartDate(e.target.value);
    }

    const changeEnd = (e) => {
        setEndDate(e.target.value);
    }

    const changeTitle = (e) => {
        setEditTitle(e.target.value);
    }

    // 수정 버튼 클릭 시 실행
    const editEvent = (e) => {
        console.log('수정 버튼 클릭함');

        setChangeNum(changeNum+1); // title 바꿀 때 마다 (수정 버튼 클릭할 때 마다) title 비워주기 위해
        props.propFunction(editTitle, startDate, endDate, color.hex); // editTitle 전달 (바뀐 title전달)
    }

    // 삭제 버튼 클릭 시 실행
    const deleteEvent = (e) => {
        console.log('Event 삭제');

        props.propFunction2(deleteEvent);
    }

    useEffect(()=> {
        setEditTitle('');
        setStartDate('');
        setEndDate('');
    }, [changeNum])

    useEffect(() => {
        if(start!=''){ setStartDate(start); }
        if(title!=''){setEditTitle(title);}
      }, [start,title])

    return (
        <div className={open ? 'openModal modal' : 'modal'}>
                  {open ? (
                    <section>
                      <header>
                        {header}
                        <button className="close" onClick={close}>
                          &times;
                        </button>
                      </header>

                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="taskId" className="col-form-label">일정 내용</label>
                            <input type="text" onChange={changeTitle} className="form-control" value={editTitle} id="calendar_edit_title" name="calendar_edit_title"/>
                            <label htmlFor="taskId" className="col-form-label">시작 날짜</label>
                            <input type="date" onChange={changeStart} className="form-control" value={startDate} id="calendar_start_date" name="calendar_start_date"/>
                            <label htmlFor="taskId" className="col-form-label">종료 날짜</label>
                            <input type="datetime-local" onChange={changeEnd} className="form-control" value={endDate} id="calendar_end_date" name="calendar_end_date"/>
                            <br />
                            <ColorPicker width={400} height={100} color={color} onChange={setColor} hideHSV dark />
                        </div>
                    </div>

                    <footer>
                        <button className="edit" onClick={editEvent}>
                          수정
                        </button>
                        <button className="delete" onClick={deleteEvent}>
                          삭제
                        </button>
                    </footer>

                    </section>
                  ) : null}
                </div>
    );
};

export default DetailModal;