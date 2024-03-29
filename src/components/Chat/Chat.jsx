import axios from "axios";
import { useEffect, useState } from "react";
import ErrorCatcherContainer from "../common/ErrorCatcher/ErrorCatcher";

function Chat(props) {
  const { setErrorMessage } = props;
  const [messages, setMessages] = useState([]);
  const [newMessageContent, setNewMessageContent] = useState("");

  useEffect(() => {
    const fetchChat = async (chatId) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://converso-social-network-api.onrender.com/private-chats/${chatId}/messages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data);
      } catch (error) {
        setErrorMessage(error.response.data.message, error.response.status);
      }
    };

    if (props.selectedChat) {
      fetchChat(props.selectedChat);
      const intervalId = setInterval(() => {
        fetchChat(props.selectedChat);
      }, 10000);
      return () => clearInterval(intervalId);
    }
  }, [props.selectedChat, setErrorMessage]);

  const sendMessage = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://converso-social-network-api.onrender.com/private-chats/${props.selectedChat}/messages`,
        { content: newMessageContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages([...messages, response.data]);
      setNewMessageContent("");
    } catch (error) {
      props.setErrorMessage(error.response.data.message, error.response.status);
    }
  };
  const deleteMessage = (messageId) => {
    const token = localStorage.getItem("token");
    axios
      .delete(
        `https://converso-social-network-api.onrender.com/private-chats/${props.selectedChat}/messages/${messageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setMessages(
          messages.filter((message) => message.messageId !== messageId)
        );
      })
      .catch((error) => {
        props.setErrorMessage(
          error.response.data.message,
          error.response.status
        );
      });
  };

  const handleSendMessage = () => {
    if (newMessageContent.length > 140) {
      return <></>;
    } else if (newMessageContent.trim() !== "") {
      sendMessage();
    }
  };

  const handleInputChange = (event) => {
    setNewMessageContent(event.target.value);
  };

  return (
    <div className="chat">
      {props.errorMessage ? <ErrorCatcherContainer /> : <></>}
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`Message ${
              message.userId === props.userId
                ? "justifycontent-flex-end"
                : "justifycontent-flex-start"
            }`}
          >
            <p>{message.content}</p>
            {message.userId === props.userId ? (
              <button
                className="delete-message"
                onClick={() => {
                  deleteMessage(message.messageId);
                }}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
      <div className="enter-message">
        <textarea
          placeholder="Enter your message"
          value={newMessageContent}
          onChange={handleInputChange}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
