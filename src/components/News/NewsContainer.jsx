import { useEffect } from "react";
import News from "./News";
import axios from "axios";
import { connect } from "react-redux";
import { getNewsData } from "../../redux/news-reducer";
import { setIsFetching } from "../../redux/profile-reducer";

const NewsContainer = ({
  newsData,
  getNewsData,
  userId,
  isFetching,
  setIsFetching,
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
        });
    };
    getAllPosts();
  }, [getNewsData, setIsFetching]);
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
        console.error(error);
      });
  };
  return (
    <News
      likeCurrentPost={likeCurrentPost}
      userId={userId}
      newsData={newsData}
      isFetching={isFetching}
    />
  );
};

let mapStateToProps = (state) => {
  return {
    newsData: state.newsInfo.newsData,
    userId: state.loginInfo.userId,
    isFetching: state.profileInfo.isFetching,
  };
};

let NewsContainerWithRedux = connect(mapStateToProps, {
  getNewsData,
  setIsFetching,
})(NewsContainer);
export default NewsContainerWithRedux;
