const ADD_POST = 'ADD-POST';
const UPDATE_TEXT_POST = 'UPDATE-TEXT-POST';
const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_TEXT_MESSAGE = 'UPDATE-TEXT-MESSAGE';

let store = {
    _state: {
        messageInfo: {
            messagesData: [{ id: 1, message: 'fsdaafadfad' }, { id: 2, message: '211241212fe' }],
            newMessageText: ''  
        },
        usersData: [{ id: 1, name: 'Sasha' }, { id: 2, name: 'Misha' }],
        profileInfo: {
            postData: [{ id: 1, postMessage: 'dsadads' }, { id: 2, postMessage: 'dsad1231243ads' }],
            newPostText: ''
        }
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        //ObServer
    },
    obServer(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        if (action.type === ADD_POST) {
            let newElem = { id: 3, postMessage: this._state.profileInfo.newPostText };
            this._state.profileInfo.postData.push(newElem);
            this._state.profileInfo.newPostText = '';
            this._callSubscriber(this._state);
        }
        else if (action.type === UPDATE_TEXT_POST) {
            this._state.profileInfo.newPostText = action.newText;
            this._callSubscriber(this._state);
        }
        else if (action.type === ADD_MESSAGE) {
            let newMessage = {id: 3, message: this._state.messageInfo.newMessageText }
            this._state.messageInfo.messagesData.push(newMessage);
            this._state.messageInfo.newMessageText = '';
            this._callSubscriber(this._state);
        }
        else if (action.type === UPDATE_TEXT_MESSAGE) {
            this._state.messageInfo.newMessageText = action.newMessageText;
            this._callSubscriber(this._state);
        }
    }
}
export const addPostActionCreator = () => ({ type: ADD_POST })

export const updateTextMessage = (text) => ({ 
    type: UPDATE_TEXT_MESSAGE, 
    newMessageText: text
})

export const updateTextActionCreator = (text) => ({
    type: UPDATE_TEXT_POST,
    newText: text
})

export const addMessage = () => ({ type: ADD_MESSAGE })

export default store;
window.store = store;