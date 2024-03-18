import { useEffect, useState } from "react";
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
  const [page, setPage] = useState(1);
  const [allPages, setAllPages] = useState();
  useEffect(() => {
    const getAllPosts = (page) => {
      setIsFetching(true);
      const token = localStorage.getItem("token");
      axios
        .get(`https://converso-social-network-api.onrender.com/news-post`, {
          params: {
            page: page,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          getNewsData(response.data.posts);
          setAllPages(response.data.totalPages);
          setIsFetching(false);
        })
        .catch((error) => {
          setIsFetching(false);
          setErrorMessage(error.response.data.message, error.response.status);
        });
    };
    getAllPosts(page);
  }, [getNewsData, setIsFetching, setErrorMessage, page]);
  let likeCurrentPost = (postId) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `https://converso-social-network-api.onrender.com/like`,
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
      <div className="news-container">
        {errorMessage ? <ErrorCatcherContainer /> : <></>}
        <News
          likeCurrentPost={likeCurrentPost}
          userId={userId}
          newsData={newsData}
          isFetching={isFetching}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
        />
        <div className="newsContainer_btn">
          {page === 1 ? (
            <></>
          ) : (
            <button onClick={() => setPage(page - 1)}>Back</button>
          )}
          {page === allPages ? (
            <></>
          ) : (
            <button onClick={() => setPage(page + 1)}>Next</button>
          )}
        </div>
      </div>
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
