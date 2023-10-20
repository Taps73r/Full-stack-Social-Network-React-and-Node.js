const ADD_POST = 'ADD-POST';
const UPDATE_TEXT_POST = 'UPDATE-TEXT-POST';

let initialState = {
    postData: [{ id: 1, postMessage: 'dsadads' }, { id: 2, postMessage: 'dsad1231243ads' }],
    newPostText: ''
}
export const profileReducer = (state = initialState, action) => {
    if (action.type === ADD_POST) {
        let newElem = { id: 3, postMessage: state.newPostText };
        state.postData.push(newElem);
        state.newPostText = '';
    }
    else if (action.type === UPDATE_TEXT_POST) {
       state.newPostText = action.newText;
    }
    return state;
}

export const updateTextActionCreator = (text) => ({
    type: UPDATE_TEXT_POST,
    newText: text
})

export const addPostActionCreator = () => ({ type: ADD_POST })