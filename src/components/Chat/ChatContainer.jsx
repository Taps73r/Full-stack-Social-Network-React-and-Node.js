import { useEffect, useState } from "react";
import Chat from "./Chat";
import axios from "axios";
import { connect } from "react-redux";
import { setIsFetching } from "../../redux/profile-reducer";

function ChatContainer({ userId, isFetching, setIsFetching }) {
  const [chats, setChats] = useState([]);

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
            console.log(response);
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

  return (
    <div className="chat-page">
      <div className="chat-route">
        {chats.map((element) => {
          return <div className=""></div>;
        })}
      </div>
      <Chat />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isFetching: state.profileInfo.isFetching,
  userId: state.loginInfo.userId,
});

const ChatContainerWithApi = connect(mapStateToProps, {
  setIsFetching,
})(ChatContainer);

export default ChatContainerWithApi;
