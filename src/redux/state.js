let store = {
    _state: {
        messagesData: [{ id: 1, message: 'fsdaafadfad' }, { id: 2, message: '211241212fe' }],
        usersData: [{ id: 1, name: 'Sasha' }, { id: 2, name: 'Misha' }],
        profileInfo: {
            postData: [{ id: 1, postMessage: 'dsadads' }, { id: 2, postMessage: 'dsad1231243ads' }],
            newPostText: 'fdsfd'
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
    dispatch(action){
        if(action.type === 'ADD-POST'){
            let newElem = { id: 3, postMessage: this._state.profileInfo.newPostText };
        this._state.profileInfo.postData.push(newElem);
        this._state.profileInfo.newPostText = '';
        this._callSubscriber(this._state);
        }
        else if(action.type === 'UPDATE-TEXT-POST'){
            this._state.profileInfo.newPostText = action.newText;
        this._callSubscriber(this._state);
        }
    }    
}

export default store;
window.store = store;