import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import cors

import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// --- GÜNCELLENMESİ GEREKEN KISIM ---
app.use(cors({
    // Frontend'in çalıştığı tam adres (sonunda / olmamalı)
    origin: "http://localhost:3000", // Veya Vite kullanıyorsan: "http://localhost:5173"
    credentials: true, // Cookie transferine izin ver
    methods: ["GET", "POST", "PUT", "DELETE"], // İzin verilen metodlar
}));
// -----------------------------------

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!!");
});

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});