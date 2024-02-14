import React, { useState, useEffect } from "react";

interface Message {
  id: number;
  room: string;
  author: string;
  message: string;
  time: string;
}

export const Chat = ({
  socket,
  username,
  room,
}: {
  socket: any;
  username: string;
  room: string;
}) => {
  const [currentMessage, setCurentMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);
  console.log(currentMessage);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        id: Math.random(),
        room: room,
        author: username,
        message: currentMessage,
        time:
          (new Date(Date.now()).getHours() % 12) +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("chat message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurentMessage("");
    }
  };

  useEffect(() => {
    const handleReceiveMsg = (data: Message) => {
      setMessageList((list) => [...list, data]);
    };
    socket.on("recieve message", handleReceiveMsg);

    return () => {
      socket.off("receive message", handleReceiveMsg);
    };
  }, [socket]);



  return (
    <div>
      <div className="flex h-[50vh] antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    <div className="col-start-1 col-end-8 p-3 rounded-lg"></div>
                    {messageList.map((data) => (
                      <div
                        className="col-start-1 col-end-13 p-3 rounded-lg "
                      >
                        <div className={`${data.author == username ? "col-start-6 col-end-13 p-3 rounded-lg flex items-center justify-start flex-row-reverse": "col-start-1 col-end-8 p-3 rounded-lg flex items-center justify-start"}`}>
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className="relative mr-3 ml-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl max-w-[50%]">
                            <div>{data.message}</div>
                          </div>
                          <p>{data.author}</p>
                          <p className="">{data.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center h-16 rounded-xl w-full px-4">
                <div></div>
                <div className="flex-grow">
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="flex w-full border rounded-3xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      value={currentMessage}
                      onChange={(e) => setCurentMessage(e.target.value)}
                      onKeyPress={(e) => {
                        e.key === "Enter" && sendMessage;
                      }}
                    />
                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    onClick={sendMessage}
                  >
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
