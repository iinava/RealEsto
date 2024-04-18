import { useContext, useDebugValue, useRef, useState } from "react";
import "./chat.scss";
import userimage from "../../assets/images/userimage.jpg";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
import { data } from "autoprefixer";
import { useEffect } from "react";
import { usenotificationstore } from "../../lib/notification.Store";
import Limebutton from "../button/Button";

function Chat({ chats }) {
  const [message, setmessage] = useState(null);
  console.log(chats);

  const messageEndRef = useRef();

  const decrease = usenotificationstore((state) => state.decrease);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const { currentUser } = useContext(AuthContext);

  const { socket } = useContext(SocketContext);

  const handleopenmessage = async (id, reciever) => {
    try {
      const response = await axios
        .get(`/api/v1/chats/getchat/${id}`)
        .then((response) => {
          console.log(response);
          if (!response.data.seenBy.includes(currentUser.id)) {
            decrease();
          }
          setmessage({ ...response.data, reciever });
          console.log(message, "njn");
        });
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const text = formdata.get("text");
    if (!text) return;
    try {
      const res = await axios.post(
        "/api/v1/messages/addmessages/" + message.id,
        { text }
      );
      console.log(res);
      setmessage((prev) => ({
        ...prev,
        messages: [...prev.messages, res.data],
      }));
      e.target.reset();
      // console.log(message.reciever.id,"njn id sir");
      let receiverId = message.reciever.id;
      console.log(receiverId, "id sir strikes again");

      console.log(message, "njananau map");
      socket.emit("sendMessage", {
        receiverId: receiverId,
        data: res.data,
      });
      console.log("send socket");
    } catch (error) {}
  };

  useEffect(() => {
    const read = async () => {
      try {
        const res = await axios.put("/api/v1/chats/read/" + message.id);
      } catch (error) {
        console.log(error);
      }
    };
    if (message && socket) {
      socket.on("getMessage", (data) => {
        if (message.id === data.chatId) {
          setmessage((prev) => ({
            ...prev,
            messages: [...prev.messages, data],
          }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, message]);

  return (
    <div className="chat px-[3vw]">
      <div className="messages custom-scrollbar">
        <h1 className="text-white font-bold text-2xl">Messages</h1>
        {chats.length === 0 && <p className="text-white">No messages</p>}
        {chats.length > 0 &&
          chats.map((chat) => (
            <div
              className={`message ${
                chat.seenBy.includes(currentUser.id)
                  ? "bg-[#c]"
                  : "bg-[#0E310E]"
              }`}
              key={chat.id}
              onClick={() => handleopenmessage(chat.id, chat.reciever)}
            >
              <img
                src={chat.reciever.avatar ? chat.reciever.avatar : userimage}
                alt=""
              />
              <span>{chat.reciever.username}</span>
              <p
                style={{
                  color: chat.seenBy.includes(currentUser.id)
                    ? "#78807a font-weight: bold"
                    : "whitesmoke",
                }}
              >
                {chat.lastMessage}
              </p>
            </div>
          ))}
      </div>

      {message && (
        <div className="chatBox">
          <div className="top  border-b-2 border-black">
            <div className="user">
              <img src={message.reciever.avatar || userimage} alt="" />
              {message.reciever.username}
            </div>
            <span className="close" onClick={() => setmessage(null)}>
              ❌
            </span>
          </div>

          <div className="center cus-scrollbar">
            {message.messages.map((message) => (
              <>
                <div
                  className={`chatMessage ${
                    message.userId === currentUser.id
                      ? "self-end "
                      : "self-start"
                  } ${
                    message.userId === currentUser.id
                      ? "text-right"
                      : "text-left"
                  } ${
                    message.userId === currentUser.id
                      ? "rounded-tl-[20px] rounded-tr-[20px] rounded-br-[0px] rounded-bl-[20px]"
                      : "rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] rounded-bl-[0px]"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
                <span
                  className={` ${
                    message.userId === currentUser.id
                      ? "self-end "
                      : "self-start"
                  } 
                  } text-[10px]`}
                >
                  {format(message.createdAt)}
                </span>
              </>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handlesubmit} className="bottom">
            <textarea placeholder="enter message .... " name="text"></textarea>
            <button>Send </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
