import { useState, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";

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
  socket: Socket;
  username: string;
  room: string;
}) => {
  const [currentMessage, setCurentMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);
  const isMounted = useRef(false);

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
    isMounted.current = true;
    const handleReceiveMsg = (data: Message) => {
      if (!messageList.find((msg) => msg.id === data.id)) {
        setMessageList([...messageList, data]);
      }
    };
    socket.on("recieve message", handleReceiveMsg);

    return () => {
      socket.off("receive message", handleReceiveMsg);
    };
  }, [socket, messageList]);

  return (
    <div>
      <div
        className="flex sm:h-[60vh] h-[100vh] md:h-[60vh] lg:h-[60vh] w-[100vw] sm:w-[70vw]
       lg:w-[30vw] antialiased text-gray-800 front"
      >
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl  h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full ">
                  <div className="border-b">
                    <h1 className="text-center text-2xl text-white font-sans font-semibold">
                      Chat Room
                    </h1>
                  </div>
                  <div className="grid grid-cols-12 gap-y-2">
                    <div className="col-start-1 col-end-13 rounded-lg pt-3">
                      <div className="col-start-1 col-end-8 p-3 rounded-lg flex items-start justify-start">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          A
                        </div>
                        <div
                          className="
                          flex flex-col items-end"
                        >
                          <div className="relative  text-sm bg-indigo-100 py-2 px-4 mx-2 shadow rounded-xl flex flex-row items-end">
                            <div className="text-[1rem]">
                              Welcome to the Chat room 👋
                            </div>
                          </div>
                          <div>
                            <p className="px-3">admin</p>
                          </div>
                        </div>

                        <p className="pt-2">{}</p>
                      </div>
                    </div>
                    {messageList.map((data,index) => (
                      <div className="col-start-1 col-end-13 rounded-lg " id={`${index}`}>
                        <div
                          className={`${
                            data.author == username
                              ? "col-start-6 col-end-13 p-3 rounded-lg flex items-start justify-start flex-row-reverse"
                              : "col-start-1 col-end-8 p-3 rounded-lg flex items-start justify-start"
                          }`}
                        >
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            {data.author.charAt(0).toUpperCase()}
                          </div>
                          <div
                            className="
                          flex flex-col items-end"
                          >
                            <div className="relative  text-sm bg-indigo-100 py-2 px-4 mx-2 shadow rounded-xl flex flex-row items-end">
                              <div className="text-[1rem]">{data.message}</div>
                            </div>
                            <div>
                              <p className="px-3 text-[13px]">{data.author}</p>
                            </div>
                          </div>
                          <p className="pt-2">{data.time}</p>
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
                    />
                    {/* <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button> */}
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-3xl text-white px-4 py-2 flex-shrink-0"
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
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
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
