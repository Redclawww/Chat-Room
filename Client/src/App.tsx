import io from "socket.io-client";

const socket = io("http://localhost:1000");
import "./App.css";
import { useState } from "react";
import { Chat } from "./components/Chat";

function App() {
  const [username, setUsername] = useState("");
  const [chatroom, setChatroom] = useState("");

  const joinChat  = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(username !== "" && chatroom !==""){
      socket.emit("join_room",chatroom);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen ">
        <form className="flex flex-col justify-center items-center bg-red-200 p-10 gap-10">
          <h1 className="text-3xl">Join Chat</h1>
          <input
            type="text"
            className="border border-black px-3"
            placeholder="Enter your name"
            onChange={(e)=>setUsername(e.target.value)}
          />
          <input
            type="text"
            className="border border-black px-3"
            placeholder="Room number"
            onChange={(e)=>setChatroom(e.target.value)}
          />
          <button className="border border-black bg-white px-5 py-2"
          onClick={joinChat}
          >
            Join
          </button>
        </form>
        <div>
          <Chat socket={socket} username={username} room={chatroom} />
        </div>
      </div>
    </>
  );
}

export default App;
