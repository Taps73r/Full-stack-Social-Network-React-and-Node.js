const IMAGE_POST_LOAD = 'IMAGE_POST_LOAD';
const TEXT_POST_LOAD = 'TEXT_POST_LOAD';
const DROP_ERRORS = 'DROP_ERRORS';
const IMAGE_PROFILE_LOAD = 'IMAGE_PROFILE_LOAD';
const TEXT_NAME_LOAD = 'TEXT_NAME_LOAD';
const TEXT_BIO_LOAD = 'TEXT_BIO_LOAD';

let initialState = {
    imagePostLoad: false,
    textPostLoad: false,
    imageAvatarLoad: false,
    textNameProfileLoad: false,
    textBioProfileLoad: false
}
export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case DROP_ERRORS:
            return {
                ...state,
                imagePostLoad: false,
                textPostLoad: false,
                imageAvatarLoad: false,
                textNameProfileLoad: false,
                textBioProfileLoad: false
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
        case IMAGE_PROFILE_LOAD:
            return {
                ...state,
                imageAvatarLoad: true,
            }
        case TEXT_BIO_LOAD:
            return {
                ...state,
                textBioProfileLoad: true
            }
        case TEXT_NAME_LOAD:
            return {
                ...state,
                textNameProfileLoad: true,
            }
        default:
            return state;
    }
}
export const setImageProfileLoad = () => ({
    type: IMAGE_PROFILE_LOAD
})
export const setTextNameLoad = () => ({
    type: TEXT_NAME_LOAD
})
export const setTextBioLoad = () => ({
    type: TEXT_BIO_LOAD
})
export const setImagePostLoad = () => ({
    type: IMAGE_POST_LOAD
})
export const setTextPostLoad = () => ({
    type: TEXT_POST_LOAD
})
export const dropErrors = () => ({
    type: DROP_ERRORS
})