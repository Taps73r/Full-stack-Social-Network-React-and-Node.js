const IMAGE_POST_LOAD = 'IMAGE_POST_LOAD';
const TEXT_POST_LOAD = 'TEXT_POST_LOAD';
const DROP_ERRORS = 'DROP_ERRORS';
let initialState = {
    imagePostLoad: false,
    textPostLoad: false
}
export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case DROP_ERRORS:
            return {
                ...state,
                imagePostLoad: false,
                textPostLoad: false
            }
        case IMAGE_POST_LOAD:
            return {
                ...state,
                imagePostLoad: true
            }
        case TEXT_POST_LOAD:
            return {
                ...state,
                textPostLoad: true
            }
        default:
            return state;
    }
}
export const setImagePostLoad = () => ({
    type: IMAGE_POST_LOAD
})
export const setTextPostLoad = () => ({
    type: TEXT_POST_LOAD
})
export const dropErrors = () => ({
    type: DROP_ERRORS
})