const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_TEXT_MESSAGE = 'UPDATE-TEXT-MESSAGE';

let initialState = {
    messagesData: [{ message: 'fsdaafadfad'}, {message: '211241212fe'}],
    newMessageText: '',
    usersData: [{ id: 1, name: 'Sasha' }, { id: 2, name: 'Misha' }]
}

export const dialogReducer = (state = initialState, action) => {
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