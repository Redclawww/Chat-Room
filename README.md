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
   - Create a `.env` file in the `Client` directory and add the following:
     ```
     VITE_URI=chat-room-peach.vercel.app
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



## Features

- Complete Auth with firebase and Credentials
- Buying a service from the catalog
- Cart Functionality 
- State Managment done using Recoil
- Adding new address to the user profile


## Installation

Clone the repo on your local machine and run

```bash
  npm install 
```
Setup the firbase in the firbase config file

```bash
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider}

```
Add the backend URL in the .env file

```bash
  VITE_API_KEY="The backend URL"
```
Run the following command to start the Application

```bash
  npm run dev       // for starting the local deployment
  npm run build     // to build the project
```

To login with email and password, use these credentials

```bash
 email: tanishqoct11@gmail.com
 password: VBK0471208
```
## List of components created

- Address.jsx 
- Card.jsx
- CardList.jsx
- Cart.jsx
- DateAndTIme.jsx
- GoogleAuth.jsx
- Navbar.jsx 
- Phone Signin.jsx
- popup.jsx

## List of Screens

- Home.jsx
- Login.jsx
- Otp.jsx 
- Signup.jsx
- Userprofile.jsx


## Authors

- [@redclawww](https://www.github.com/Redclawww)

