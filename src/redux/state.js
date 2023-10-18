import { dialogReducer } from "./dialog-reducer";
import { profileReducer } from "./profile-reducer";

const ADD_POST = 'ADD-POST';
const UPDATE_TEXT_POST = 'UPDATE-TEXT-POST';
const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_TEXT_MESSAGE = 'UPDATE-TEXT-MESSAGE';

let store = {
    _state: {
        messageInfo: {
            messagesData: [{ message: 'fsdaafadfad'}, {message: '211241212fe'}],
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
        profileReducer(this._state.profileInfo, action)
        dialogReducer(this._state.messageInfo, action)
        this._callSubscriber(this._state)
    }
}

export default store;
window.store = store;