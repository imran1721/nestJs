import React, { useState } from "react";
import io from "socket.io-client";
import ChatWidget from "./component/ChatWidget";
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const socket = io.connect(`${API_BASE_URL}/chat`);

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);

  const logIn = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      const res = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
            "Content-Type": "application/json"
        }
      })

      if (res.status === 200) {
        toast("✅ User Authenticated", {type: "success"});
        const responseData = await res.json();
        setUsername(responseData.username);
        socket.emit("joinRoom", {username: responseData.username, room: "Room"});
        setShowChat(true);
      }
      else {
        toast("❌ Incorrect email or password!", {type: "error"});
      }
    }
  };

  return (
    <>
        <ToastContainer />
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
                onKeyDown={(event)=> event.key === "Enter" && logIn(event)}
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

    </>
  );
}

export default Home;
