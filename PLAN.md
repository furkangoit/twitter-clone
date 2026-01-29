# NexChat Architecture Plan

## 1. Project Overview
**App Name:** NexChat
**Description:** A real-time social messaging application with instant messaging, online status, and user profiles.
**Tech Stack:**
- **Frontend:** React (Vite), Tailwind CSS, DaisyUI (optional for components), Zustand, React Router.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (Mongoose).
- **Real-time:** Socket.io.
- **Auth:** JWT with HttpOnly cookies.

## 2. Database Schema (MongoDB)

### User Schema
```javascript
{
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  gender: { type: String, required: true, enum: ["male", "female"] },
  profilePic: { type: String, default: "" },
  // timestamps: true
}
```

### Conversation Schema
```javascript
{
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message", default: [] }],
  // timestamps: true
}
```

### Message Schema
```javascript
{
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  // timestamps: true
}
```

## 3. API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user.
- `POST /api/auth/login` - Login user and set cookie.
- `POST /api/auth/logout` - Clear cookie.

### Messages
- `GET /api/messages/:id` - Get conversation with user `:id`.
- `POST /api/messages/send/:id` - Send a message to user `:id`.

### Users
- `GET /api/users` - Get all users (for sidebar).

## 4. Real-time Events (Socket.io)
- `connection`: Triggered when a user connects. Handshake includes userId.
- `getOnlineUsers`: Emitted to all clients to update sidebar online status.
- `newMessage`: Emitted to specific client when they receive a message.
- `disconnect`: Updates online users list.

## 5. Project Structure
```
NexChat/
├── client/          # Vite + React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── zustand/
│   └── ...
├── server/          # Node + Express Backend
│   ├── controllers/
│   ├── db/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── utils/
│   └── server.js
├── package.json     # Root scripts (optional)
└── ...
```

## 6. Implementation Steps
1. **Setup**: Initialize folders and install dependencies.
2. **Backend**: Setup Express, connect MongoDB, create Models.
3. **Auth**: Implement JWT auth flow.
4. **Socket**: Setup Socket.io server.
5. **Frontend**: Setup Vite, Tailwind, Router.
6. **UI**: Create Login, Signup, Home (Chat) pages.
7. **Integration**: Connect API and Socket to React components.
