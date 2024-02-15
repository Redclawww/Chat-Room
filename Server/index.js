import express from "express";
import cors from 'cors';
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: "https://chatroomclient.vercel.app",
        methods:["GET","PUT"]
    }
});

io.on("connection",(socket)=>{
    console.log("A user connected");
    socket.on("join_room",(data)=>{
       socket.join(data);
       console.log(`User ID: ${socket.id} joined room: ${data}`);
        
    });

    socket.on("disconnect",()=>{
        console.log("User Disconnected...",socket.id);
    });  
    
    socket.on("chat message",(data)=>{
        //for the sake of simplicity we’ll send the message to everyone, including the sender.
        socket.broadcast.to(data.room).emit("recieve message", data);
        console.log("Send Message Data:",data);
    })
});



app.get("/",(req,res)=>{
    res.json("The Backend is working")
})

app.use(cors());

server.listen(1000,()=>{
    console.log("Server is running on port on 1000");
});

