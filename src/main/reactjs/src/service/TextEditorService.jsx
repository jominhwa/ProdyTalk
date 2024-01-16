import axios from 'axios';

class TextEditorService {

    changeText(delta){
        return axios.post('/api/texteditor/change', {params: { text : delta, }});
    }
//     getText(){
//         return axios.get('/api/texteditor/get');
//     }

}

export default new TextEditorService();