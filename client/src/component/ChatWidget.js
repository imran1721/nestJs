import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function ChatWidget({ socket, username }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        sender: username,
        room: "Room",
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("chatToServer", messageData);
      // setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("chatToClient", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
    socket.on("joinedRoom", (user) => {
      setOnlineUsers((users) => [...users, user]);
    })
  }, [socket]);

  return (
    <div className="h-full w-full flex my-10">
        <div className="h-3/5 w-60 border ml-40 mt-12 border-black bg-white">
        <div className="h-12 px-10 bg-gray-200">
        <p className="block py-2 leading-10 font-semibold">Online Users</p>
      </div>
          {onlineUsers.map(user => (
            <p className="mt-3 ml-5 font-semibold">@{user}</p>
          ))}
        </div>
        <div className="h-2/3 w-2/4 bg-white rounded-xl shadow-lg">
      <div className="h-12 px-10 rounded-md bg-black relative cursor-pointer">
        <p className="block  py-2 text-white leading-10">Live Chat</p>
      </div>
      <div className="h-5/6 border  border-black bg-white relative">
        <ScrollToBottom className="h-full w-full overflow-y-scroll overflow-x-hidden snap-none">
          {messageList.map((messageContent) => {
            return (
              <div
                className={
                  username === messageContent.sender
                    ? "h-auto padding-3 flex mt-2 justify-start"
                    : "h-auto padding-3 flex mt-2 justify-end"
                }
              >
                <div>
                  <div
                    className={
                      username === messageContent.sender
                        ? "h-auto w-auto h-min-40px w-max-120px bg-orange-300 rounded text-white flex align-center mx-1 p-1 break-words font-semibold justify-start"
                        : "h-auto w-auto h-min-40px w-max-120px bg-blue-600 rounded text-white flex align-center mx-1 p-1 break-words font-semibold justify-end"
                    }
                  >
                    <p>{messageContent.message}</p>
                  </div>
                  <div
                    className={
                      username === messageContent.sender
                        ? "h-auto padding-3 flex mt-2 justify-start ml-3"
                        : "h-auto padding-3 flex mt-2 justify-end mr-5"
                    }
                  >
                    <p>{messageContent.time}</p>
                    <p className="ml-2 text-bold">{messageContent.sender}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="h-10 border border-black flex border-t-0">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type a message"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
          className="h-full flex basis-4/5 outline-none px-3"
        />

        <button
          onClick={sendMessage}
          className="h-full flex basis-1/5 justify-center outline-none bg-indigo-600 text-white font-bold text-xl"
        >
          send
        </button>
      </div>
    </div>
    </div>
  );
}

export default ChatWidget;
