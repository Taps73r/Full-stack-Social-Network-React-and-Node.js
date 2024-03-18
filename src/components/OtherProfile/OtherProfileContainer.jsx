import {
  fetchPostData,
  setIsFetching,
  setPage,
  setProfile,
  toggleSubscriptionProfile,
} from "../../redux/other-profile-reducer";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import OtherProfile from "./OtherProfile";
import axios from "axios";
import { connect } from "react-redux";
import Preloader from "../common/Preloader/Preloader";
import { setErrorMessage } from "../../redux/error-reducer";
import ErrorCatcherContainer from "../common/ErrorCatcher/ErrorCatcher";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}
class OtherProfileContainer extends React.Component {
  componentDidMount() {
    let profileId = this.props.router.params.userId;
    this.requestProfileInfo(profileId);
  }
  requestProfileInfo = (userId) => {
    const token = localStorage.getItem("token");
    this.props.setIsFetching(true);
    const url = `https://converso-social-network-api.onrender.com/profile/${userId}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.props.setProfile(response.data);
        this.props.setIsFetching(false);
      })
      .catch((error) => {
        this.props.setErrorMessage(
          error.response.data.message,
          error.response.status
        );
        this.props.setIsFetching(false);
      });
    axios
      .get(
        `https://converso-social-network-api.onrender.com/profile/${userId}/posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        this.props.fetchPostData(response.data);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message, error.response.status);
      });
  };
  fetchMorePosts = (userId, page) => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `https://converso-social-network-api.onrender.com/profile/${userId}/posts`,
        {
          params: {
            page: page,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        this.props.fetchPostData(response.data);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message, error.response.status);
      });
  };
  handleNextPage = () => {
    const nextPage = this.props.page + 1;
    this.props.setPage(nextPage);
    this.fetchMorePosts(this.props.router.params.userId, nextPage);
  };

  handlePrevPage = () => {
    const prevPage = this.props.page - 1;
    this.props.setPage(prevPage);
    this.fetchMorePosts(this.props.router.params.userId, prevPage);
  };

  subscribeUserProfile = (followerId, followingId) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "https://converso-social-network-api.onrender.com/subscribe",
        { followerId, followingId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.subscription === "No") {
          const no = [0];
          this.props.toggleSubscriptionProfile(no);
        }
        this.props.toggleSubscriptionProfile(
          response.data.subscription.follower
        );
      })
      .catch((error) => {
        this.props.setErrorMessage(
          error.response.data.message,
          error.response.status
        );
      });
  };
  likeCurrentPost = (postId) => {
    const token = localStorage.getItem("token");
    let userId = this.props.loginUser;
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
        this.props.setErrorMessage(
          error.response.data.message,
          error.response.status
        );
      });
  };
  render() {
    if (this.props.isFetching || !this.props.profileData) {
      return <Preloader />;
    }
    return (
      <>
        {this.props.errorMessage ? <ErrorCatcherContainer /> : <></>}
        <OtherProfile
          likeCurrentPost={this.likeCurrentPost}
          postData={this.props.postData}
          profileData={this.props.profileData}
          loggedId={this.props.loginUser}
          handleSubscribe={this.subscribeUserProfile}
          setErrorMessage={this.props.setErrorMessage}
          errorMessage={this.props.errorMessage}
        />
        <div className="newsContainer_btn">
          {this.props.page === 1 ? (
            <></>
          ) : (
            <button onClick={this.handlePrevPage}>Back</button>
          )}
          {this.props.page === this.props.pagesCount ||
          this.props.pagesCount === 0 ? (
            <></>
          ) : (
            <button onClick={this.handleNextPage}>Next</button>
          )}
        </div>
      </>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    postData: state.otherProfileInfo.postData,
    profileData: state.otherProfileInfo.profileData,
    loginUser: state.loginInfo.userId,
    isFetching: state.otherProfileInfo.isFetching,
    errorMessage: state.errorInfo.errorMessage,
    pagesCount: state.otherProfileInfo.pagesCount,
    page: state.otherProfileInfo.page,
  };
};

let OtherProfileContainerWithApi = connect(mapStateToProps, {
  setProfile,
  setErrorMessage,
  setIsFetching,
  toggleSubscriptionProfile,
  fetchPostData,
  setPage,
})(withRouter(OtherProfileContainer));

export default OtherProfileContainerWithApi;
