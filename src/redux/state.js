import { reRenderTree } from "../render";


let state = {
    messagesData: [{ id: 1, message: 'fsdaafadfad' }, { id: 2, message: '211241212fe' }],
    usersData: [{ id: 1, name: 'Sasha' }, { id: 2, name: 'Misha' }],
    profileInfo: { postData: [{ id: 1, postMessage: 'dsadads' }, { id: 2, postMessage: 'dsad1231243ads' }], newPostText: ''}
}

window.state = state;
export function addPost() {
    let newElem = { id: 3, postMessage: state.profileInfo.newPostText };
    state.profileInfo.postData.push(newElem);
    state.profileInfo.newPostText = '';
    reRenderTree(state);
}

export function updateTextPost(newText) {
    state.profileInfo.newPostText = newText;
    reRenderTree(state);
}
export default state;