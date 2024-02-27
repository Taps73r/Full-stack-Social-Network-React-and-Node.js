import axios from "axios";
import "./CreateChat.css";
import staticPhoto from "../../../photos/userstaticavatar.jpg";

import React, { useEffect, useState } from "react";

export default function CreateChat(props) {
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
    async function fetchSubscriptions() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:3002/subscriptions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubscriptions(response.data);
      } catch (error) {
        console.error("Помилка при отриманні списку підписок:", error);
      }
    }
    fetchSubscriptions();
  }, []);

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
