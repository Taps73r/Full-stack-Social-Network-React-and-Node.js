import axios from "axios";
import { useEffect } from "react";

function Chat(props) {
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
        console.log(response.data);
      } catch (error) {
        console.error("Помилка отримання повідомлень чата:", error);
      }
    };

    if (props.selectedChat) {
      fetchChat(props.selectedChat);
    }
  }, [props.selectedChat]);
  return <div className="chat">
    <div className="chat-messages"></div>
    <div className="enter-message">
      <textarea placeholder="Enter your message"></textarea>
      <button>Send</button>
    </div>
  </div>;
}

export default Chat;
