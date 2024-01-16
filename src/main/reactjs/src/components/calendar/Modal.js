import React,{useEffect} from 'react';
import {useState} from 'react';
import '../css/Modal.css';
import {ColorPicker, useColor} from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

const Modal = (props) => {

  // open, close, Modal header 텍스트를 모로부터 받아옴
  const { open, close, add, header, start } = props;

  const[content, setContent] = useState('');
  const[startDate, setStartDate] = useState('');
  const[endDate, setEndDate] = useState('');
  const[changeNum, setChangeNum] = useState(1);
  const[color, setColor] = useColor("hex", "#121212");

  const changeContent = (e) => {
    setContent(e.target.value);
  }

  const changeStart = (e) => {
    setStartDate(e.target.value);
  }

  const changeEnd = (e) => {
    setEndDate(e.target.value);
  }

  const addEvent = () => {
    setChangeNum(changeNum+1); // add 버튼 누를 때 마다 changeNum + 1 해주기

    props.propFunction(content, startDate, endDate, color.hex); // 바뀐 값 전달
  }

  // changeNum 변경마다 hello 출력 (add 버튼 누를 때 마다)
  useEffect(() => {
    setContent('');
    setStartDate('');
    setEndDate('');

    console.log('add');
  }, [changeNum])

  // start 변하면 그 값을 startDate에 넘겨주기
  useEffect(() => {
    if(start!=''){ setStartDate(start); }
  }, [start])

  // console.log('전달받은 시작날짜 : ' + start);

  return (
     // 모달이 열릴때 openModal 클래스가 생성된다.
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
                    <input type="text" onChange={changeContent} className="form-control" value={content} id="calendar_content" name="calendar_content"/>
                    <label htmlFor="taskId" className="col-form-label">시작 날짜</label>
                    <input type="date" onChange={changeStart} className="form-control" value={startDate} id="calendar_start_date" name="calendar_start_date"/>
                    <label htmlFor="taskId" className="col-form-label">종료 날짜</label>
                    <input type="datetime-local" onChange={changeEnd} className="form-control" value={endDate} id="calendar_end_date" name="calendar_end_date"/>
                    <br />
                    <ColorPicker width={400} height={100} color={color} onChange={setColor} hideHSV dark />
                </div>
              </div>

              <footer>
                <button className="add" onClick={addEvent}>
                  add
                </button>
                <button className="close" onClick={close}>
                  close
                </button>
              </footer>

            </section>
          ) : null}
        </div>
  );
};

export default Modal;