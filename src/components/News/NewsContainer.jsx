import { useEffect } from "react";
import News from "./News";
import axios from "axios";
import { connect } from "react-redux";
import { getNewsData } from "../../redux/news-reducer";

const NewsContainer = ({ newsData, getNewsData, userId }) => {
  useEffect(() => {
    const getAllPosts = () => {
      axios
        .get(`http://localhost:3002/news-post`)
        .then((response) => {
          console.log(response.data);
          getNewsData(response.data);
        })
        .catch((error) => {});
    };
    getAllPosts();
  }, [getNewsData]);
  let likeCurrentPost = (postId) => {
    axios
      .post(`http://localhost:3002/like`, { postId, userId })
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
    />
  );
};

let mapStateToProps = (state) => {
  return {
    newsData: state.newsInfo.newsData,
    userId: state.loginInfo.userId,
  };
};

let NewsContainerWithRedux = connect(mapStateToProps, {
  getNewsData,
})(NewsContainer);
export default NewsContainerWithRedux;
