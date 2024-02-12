import {
  setIsFetching,
  setProfile,
  toggleSubscriptionProfile,
} from "../../redux/other-profile-reducer";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import OtherProfile from "./OtherProfile";
import axios from "axios";
import { connect } from "react-redux";
import Preloader from "../common/Preloader/Preloader";

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
    this.props.setIsFetching(true);
    const url = `http://localhost:3002/profile/${userId}`;
    axios
      .get(url)
      .then((response) => {
        this.props.setProfile(response.data);
        this.props.setIsFetching(false);
      })
      .catch((error) => {
        // Обробка помилки
        console.error("Error fetching profile data:", error);
        this.props.setIsFetching(false);
      });
  };
  subscribeUserProfile = (followerId, followingId) => {
    axios
      .post("http://localhost:3002/subscribe", { followerId, followingId })
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
        console.error("Error subscribing user:", error);
      });
  };
  likeCurrentPost = (postId) => {
    let userId = this.props.loginUser;
    axios
      .post(`http://localhost:3002/like`, { postId, userId })
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  };
  render() {
    if (this.props.isFetching || !this.props.profileData) {
      return <Preloader />;
    }
    return (
      <OtherProfile
        likeCurrentPost={this.likeCurrentPost}
        postData={this.props.postData}
        profileData={this.props.profileData}
        loggedId={this.props.loginUser}
        handleSubscribe={this.subscribeUserProfile}
      />
    );
  }
}
let mapStateToProps = (state) => {
  return {
    postData: state.otherProfileInfo.postData,
    profileData: state.otherProfileInfo.profileData,
    loginUser: state.loginInfo.userId,
    isFetching: state.otherProfileInfo.isFetching,
  };
};

let OtherProfileContainerWithApi = connect(mapStateToProps, {
  setProfile,
  setIsFetching,
  toggleSubscriptionProfile,
})(withRouter(OtherProfileContainer));

export default OtherProfileContainerWithApi;
