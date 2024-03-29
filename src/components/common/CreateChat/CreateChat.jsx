import axios from "axios";
import "./CreateChat.css";
import staticPhoto from "../../../photos/userstaticavatar.jpg";

import React, { useEffect, useState } from "react";
import ErrorCatcherContainer from "../ErrorCatcher/ErrorCatcher";

export default function CreateChat(props) {
  const { setErrorMessage } = props;
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    async function fetchSubscriptions() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://converso-social-network-api.onrender.com/subscriptions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubscriptions(response.data);
      } catch (error) {
        setErrorMessage(error.response.data.message, error.response.status);
      }
    }
    fetchSubscriptions();
  }, [setErrorMessage]);

  const handleCreateChat = async (userId) => {
    try {
      props.createChat(userId);
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.filter((sub) => sub.userId !== userId)
      );
    } catch (error) {
      console.error("Помилка при створенні чату:", error);
    }
  };

  return (
    <div className="Create-chat">
      {props.errorMessage ? <ErrorCatcherContainer /> : <></>}
      <button
        className="back-btn"
        onClick={() => {
          props.setFollowedUsers(false);
        }}
      >
        back
      </button>
      {subscriptions.map((sub) => {
        return (
          <div className="create-chat-block" key={sub.userId}>
            <div className="create-chat-card">
              <img src={sub.photo != null ? sub.photo : staticPhoto} alt="" />
              <p>{sub.name}</p>
            </div>
            <button
              className="create-chat-btn"
              onClick={() => {
                handleCreateChat(sub.userId);
              }}
            >
              Create Chat
            </button>
          </div>
        );
      })}
    </div>
  );
}
