import React,{useEffect} from 'react';
import {useState} from 'react';
import '../css/Modal.css';

const ToDoListModal = (props) => {

  // open, close, Modal header 텍스트를 모로부터 받아옴
  const { open, close, add, header } = props;

  const[content, setContent] = useState('');
  const[changeNum, setChangeNum] = useState(1);

  const changeContent = (e) => {
    setContent(e.target.value);
  }

  const addEvent = () => {
    setChangeNum(changeNum+1); // add 버튼 누를 때 마다 changeNum + 1 해주기

    props.propFunction(content); // 바뀐 값 전달
  }

  // changeNum 변경마다 hello 출력 (add 버튼 누를 때 마다)
  useEffect(() => {
    setContent('');
  }, [changeNum])

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
                    <label htmlFor="taskId" className="col-form-label">내용</label>
                    <input type="text" onChange={changeContent} className="form-control" value={content} id="calendar_content" name="calendar_content"/>


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

export default ToDoListModal;