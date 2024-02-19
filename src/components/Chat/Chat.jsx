import axios from "axios";
import { useEffect, useState } from "react";

function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [newMessageContent, setNewMessageContent] = useState("");

  useEffect(() => {
    const fetchChat = async (chatId) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3002/private-chats/${chatId}/messages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Помилка отримання повідомлень чата:", error);
      }
    };

    if (props.selectedChat) {
      fetchChat(props.selectedChat);
    }
  }, [props.selectedChat]);

  const sendMessage = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3002/private-chats/${props.selectedChat}/messages`,
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
      console.error("Помилка відправлення повідомлення:", error);
    }
  };

  const handleSendMessage = () => {
    if (newMessageContent.trim() !== "") {
      sendMessage();
    }
  };

  const handleInputChange = (event) => {
    setNewMessageContent(event.target.value);
  };

  return (
    <div className="chat">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index}>
            <p>
              {message.sender}: {message.content}
            </p>
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
