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
import { deleteErrorMessage, setErrorMessage } from "../../redux/error-reducer";

function ChatContainer({ userId, isFetching, setIsFetching }) {
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
        console.error("Помилка отримання списку чатів:", error);
      }
    };

    fetchChats();
  }, [setIsFetching, userId]);
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
      console.error("Помилка створення чату:", error);
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
      />
    );
  }

  return (
    <div className="chat-page">
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
      <Chat userId={userId} selectedChat={selectedChat} />
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
  deleteErrorMessage,
  setErrorMessage,
})(ChatContainer);

export default ChatContainerWithApi;
