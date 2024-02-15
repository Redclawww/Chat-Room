# Chat App

## Description

A simple chat app build with react and socket.io where multiple user can chat with each other.

![landing page](https://i.imgur.com/Ds83n2d.png)

## Technologies Used

- **Frontend:**
  - React.js
  - Tailwind for UI
  - socket.io-client for chat functionality

- **Backend:**
  - Node.js
  - Express.js
  - Socket.IO

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Redclawww/Chat-Room.git
   cd Chat-room
   ```

2. **Install Dependencies:**
   ```bash
   # Install server dependencies
   cd Server
   npm install

   # Install client dependencies
   cd Client
   npm install
   ```

3. **Set Up Environment Variables:**
   - Open the `.env` file in the `Client` directory and change the following:
     ```
     VITE_URI=http://localhost:1000
     ```
   - Open the `.env` file in the `Server` directory and change the following:
     ```
     URI=http://localhost:5173
     ```

4. **Run the Application:**
   ```bash
   # Run the server (from the 'Server' directory)
   node index.js

   # Run the client (from the 'Client' directory)
   npm run dev
   ```

   Access the application at `http://localhost:5173`.

## Folder Structure

- **`Client`:** Frontend React application.
- **`Server`:** Backend Node.js and Express server.

## How It Works

1. **Join Chat Room with Name and Chat Room Number(use the same Chat room number for testing):**

![Chat page](https://i.imgur.com/NsyJSRQ.png)
   
2. **Starting Chating.. have fun ✌️**

## Feedback

If you have any feedback, please reach out to redclaww02@gmail.com

## Authors

- [@redclawww](https://www.github.com/redclawww)


