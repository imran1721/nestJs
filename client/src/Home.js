import React, { useState } from "react";
import io from "socket.io-client";
import ChatWidget from "./component/ChatWidget";
import "./App.css";

const socket = io.connect("http://localhost:3001/chat");

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);

  const logIn = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      const res = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
            "Content-Type": "application/json"
        }
      })
console.log(res);
      if (res.status === 200) {
        const responseData = await res.json();
        setUsername(responseData.username);
        socket.emit("joinRoom", {username: responseData.username, room: "Room"});
        setShowChat(true);
      }
      else {
        alert('Authentication Failed')
      }
    }
  };

  return (
    <div className="flex justify-center align-middle min-w-screen min-h-screen bg-slate-50 h-1">
      {!showChat ? (
        <div className="flex h-96 lg:w-1/4 sm:w-2/4 mx-auto my-auto bg-white rounded-xl shadow-lg  py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full">
            <h1 className="text-xl font-medium text-black text-center">
              Welcome!
            </h1>
            <div className="flex flex-col ">
              <label className="text-xl mt-3">Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                className="p-2 mt-3 border border-indigo-600"
              />
              <label className="text-xl mt-3">Password</label>
              <input
                type="text"
                placeholder="Password..."
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                className="p-2 mt-3 border border-indigo-600"
              />
              <button
                className="mt-3 block bg-indigo-600 text-xl font-bold  text-white p-2"
                onClick={logIn}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      ) : (
        <ChatWidget socket={socket} username={username} password={password} />
      )}
    </div>
  );
}

export default Home;
