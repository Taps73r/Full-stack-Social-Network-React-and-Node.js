import { useEffect } from "react";
import News from "./News";
import axios from "axios";
import { connect } from "react-redux";
import { getNewsData } from "../../redux/news-reducer";

const NewsContainer = ({ newsData, getNewsData }) => {
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
  return <News newsData={newsData} />;
};

let mapStateToProps = (state) => {
  return {
    newsData: state.newsInfo.newsData,
  };
};

let NewsContainerWithRedux = connect(mapStateToProps, {
  getNewsData,
})(NewsContainer);
export default NewsContainerWithRedux;
