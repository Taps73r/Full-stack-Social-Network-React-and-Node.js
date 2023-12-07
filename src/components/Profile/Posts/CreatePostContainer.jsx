import './CreatePost.css';
import { updateTextActionCreator, uploadPostImages } from './../../../redux/profile-reducer';
import CreatePost from './CreatePost';
import { connect } from 'react-redux';
import { dropErrors, setImagePostLoad, setTextPostLoad } from '../../../redux/error-reducer';

const mapProfileInfoToProps = (state) => {
    return {
        newPostText: state.profileInfo.newPostText,
        imageError: state.errorInfo.imagePostLoad,
        textError: state.errorInfo.textPostLoad    
    };
};

const CreatePostContainer = ({ addPost, ...props }) => {
    return <CreatePost addPost={addPost} {...props} />;
};
export default connect(mapProfileInfoToProps, {
    updateTextPost: updateTextActionCreator,
    uploadPostImages,
    dropErrors,
    setImagePostLoad,
    setTextPostLoad
})(CreatePostContainer);
