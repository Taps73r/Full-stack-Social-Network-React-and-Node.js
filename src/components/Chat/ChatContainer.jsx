import { useEffect, useState } from "react";
import Chat from "./Chat";
import axios from "axios";
import { connect } from "react-redux";
import { setIsFetching } from "../../redux/profile-reducer";
import Preloader from "../common/Preloader/Preloader";
import CreateChat from "../common/CreateChat/CreateChat";
import { NavLink } from "react-router-dom";
import "./Chat.css";
import staticPhoto from "../../photos/userstaticavatar.jpg";
import { setErrorMessage } from "../../redux/error-reducer";
import ErrorCatcherContainer from "../common/ErrorCatcher/ErrorCatcher";

function ChatContainer({
  userId,
  isFetching,
  setIsFetching,
  errorMessage,
  setErrorMessage,
}) {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [followedUsers, setFollowedUsers] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setIsFetching(true);
        const token = localStorage.getItem("token");
        await axios
          .get(`http://localhost:3002/private-chats/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setChats(response.data);
            setIsFetching(false);
          });
      } catch (error) {
        setIsFetching(false);
        setErrorMessage(error.response.data.message, error.response.status);
      }
    };

    fetchChats();
  }, [setIsFetching, userId, setErrorMessage]);
  const handleCheckChat = (chatId) => {
    setSelectedChat(chatId);
  };
  const createChat = async (participantId) => {
    const token = localStorage.getItem("token");
    const partId = participantId;
    try {
      await axios
        .post(
          `http://localhost:3002/private-chats`,
          { partId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          return <></>;
        });
    } catch (error) {
      setIsFetching(false);
      setErrorMessage(error.response.data.message, error.response.status);
    }
  };
  if (isFetching || !chats) {
    return <Preloader />;
  }
  if (followedUsers === true) {
    return (
      <CreateChat
        createChat={createChat}
        followedUsers={followedUsers}
        setFollowedUsers={setFollowedUsers}
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
      />
    );
  }

  return (
    <div className="chat-page">
      {errorMessage ? <ErrorCatcherContainer /> : <></>}
      <div className="chat-route">
        {chats.map((element, index) => {
          return (
            <div className="chat-list-div" key={index}>
              <NavLink
                to={`/dialogs/${element.chatId}`}
                className="chat-list-block"
                onClick={() => handleCheckChat(element.chatId)}
              >
                <img src={element.avatar || staticPhoto} alt="" />
                <p>{element.username}</p>
              </NavLink>
            </div>
          );
        })}
        <div className="create-chat">
          <button
            onClick={() => {
              setFollowedUsers(true);
            }}
          >
            Create Chat
          </button>
        </div>
      </div>
      <Chat
        userId={userId}
        selectedChat={selectedChat}
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isFetching: state.profileInfo.isFetching,
  userId: state.loginInfo.userId,
  errorMessage: state.errorInfo.errorMessage,
});

const ChatContainerWithApi = connect(mapStateToProps, {
  setIsFetching,
  setErrorMessage,
})(ChatContainer);

export default ChatContainerWithApi;
