const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_TEXT_MESSAGE = 'UPDATE-TEXT-MESSAGE';

export const dialogReducer = (state, action) => {
    if (action.type === ADD_MESSAGE) {
        let newMessage = { message: state.newMessageText } 
        state.messagesData.push(newMessage);
        state.newMessageText = '';
    }
    else if (action.type === UPDATE_TEXT_MESSAGE) {
        state.newMessageText = action.newMessageText;
    }

    return state;
}

export const updateTextMessage = (text) => ({ 
    type: UPDATE_TEXT_MESSAGE, 
    newMessageText: text
})

export const addMessage = () => ({ type: ADD_MESSAGE })