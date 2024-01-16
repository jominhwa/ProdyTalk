import React, {useState, useEffect} from "react";
import '../css/TextEditor.css';
import TextEditorService from '../../service/TextEditorService';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

function TextEditorComponent(props) {
    const { quill, quillRef } = useQuill();
    const theme = 'snow';

//     useEffect(() => {
//         TextEditorService.getText().then(res => {
//             console.log(res.data)
//             quill.setText(res.data);
//         })
//     },[quill]);

    useEffect(() => {
        if (quill) {
            //quill.clipboard.dangerouslyPasteHTML('<h1>문서 공동 작업!!</h1>');
            quill.on('text-change', (delta, oldDelta, source) => {
                //console.log('Text change!');
                //console.log(delta);
                //console.log(quill.getText()); // Get text only
                //console.log(quill.getContents()); // Get delta contents
                //console.log(quill.root.innerHTML); // Get innerHTML using quill
                //console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
                TextEditorService.changeText(quill.getContents());
            });
        }
    },[quill]);
    return (
        <div className="main-content">
            <div ref={quillRef} />
        </div>
    );
}

export default TextEditorComponent;