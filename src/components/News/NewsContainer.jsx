import { useEffect } from "react";
import News from "./News";
import axios from "axios";
import { connect } from "react-redux";
import { getNewsData } from "../../redux/news-reducer";
import { setIsFetching } from "../../redux/profile-reducer";
import { setErrorMessage } from "../../redux/error-reducer";
import ErrorCatcherContainer from "../common/ErrorCatcher/ErrorCatcher";

const NewsContainer = ({
  newsData,
  getNewsData,
  userId,
  isFetching,
  setIsFetching,
  setErrorMessage,
  errorMessage,
}) => {
  useEffect(() => {
    const getAllPosts = () => {
      setIsFetching(true);
      const token = localStorage.getItem("token");
      axios
        .get(`http://localhost:3002/news-post`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          getNewsData(response.data);
          setIsFetching(false);
        })
        .catch((error) => {
          setIsFetching(false);
          setErrorMessage(error.response.data.message, error.response.status);
        });
    };
    getAllPosts();
  }, [getNewsData, setIsFetching, setErrorMessage]);
  let likeCurrentPost = (postId) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://localhost:3002/like`,
        { postId, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        setErrorMessage(error.response.data.message, error.response.status);
      });
  };
  return (
    <>
      {errorMessage ? <ErrorCatcherContainer /> : <></>}
      <News
        likeCurrentPost={likeCurrentPost}
        userId={userId}
        newsData={newsData}
        isFetching={isFetching}
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
      />
    </>
  );
};

let mapStateToProps = (state) => {
  return {
    newsData: state.newsInfo.newsData,
    userId: state.loginInfo.userId,
    isFetching: state.profileInfo.isFetching,
    errorMessage: state.errorInfo.errorMessage,
  };
};

let NewsContainerWithRedux = connect(mapStateToProps, {
  getNewsData,
  setIsFetching,
  setErrorMessage,
})(NewsContainer);
export default NewsContainerWithRedux;
