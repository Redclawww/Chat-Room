import io from "socket.io-client";
const socket = io("wss://chat-room-peach.vercel.app");

import "./App.css";
import { useState } from "react";
import { Chat } from "./components/Chat";

function App() {
  const [username, setUsername] = useState("");
  const [chatroom, setChatroom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (username !== "" && chatroom !== "") {
      socket.emit("join_room", chatroom);
      setShowChat(true);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen ">
        <video
          src="/bg.mp4"
          autoPlay
          muted
          loop
          className="absolute w-full h-full object-cover -z-0"
        ></video>
        {showChat == false ? (
          <form className="flex flex-col justify-center items-center p-10 gap-10 front">
            <h1 className="text-3xl">Join Chat Room</h1>
            <input
              type="text"
              className="px-10 py-5 rounded-3xl placeholder-gray-500 text-gray-500"
              placeholder="Enter your name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              className=" px-10 py-5 rounded-3xl placeholder-gray-500 text-gray-500"
              placeholder="Room number"
              onChange={(e) => setChatroom(e.target.value)}
            />
            <button
              className="bg-white px-5 py-2 font-bold rounded-2xl text-xl text-black"
              onClick={joinChat}
            >
              Join
            </button>
          </form>
        ) : (
          <div>
            <Chat socket={socket} username={username} room={chatroom} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
