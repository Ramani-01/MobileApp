require("dotenv").config({ path: "./.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const { ObjectId } = mongoose.Types;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Environment variables
const SECRET_KEY = process.env.SECRET_KEY;
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;

if (!SECRET_KEY || !MONGODB_URI) {
    console.error("❌ Missing environment variables! Check .env file.");
    process.exit(1);
}

// ✅ MongoDB Connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    });

// ✅ User Schema (Login/Registration)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const usersModel = mongoose.model("User", userSchema);

// ✅ Book Schema (Still using external Book model)
const Book = require("./models/Book");

// ✅ JWT Middleware
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ message: "Unauthorized" });

    try {
        req.user = jwt.verify(token, SECRET_KEY);
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
};

// ✅ Register
app.post("/users", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await usersModel.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new usersModel({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
});

// ✅ Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await usersModel.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "User not found. Please sign up first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" });

    res.json({
        message: "Login successful",
        user: { name: user.name, email: user.email },
        token,
    });
});

// ✅ Profile (Protected)
app.get("/profile", authMiddleware, async (req, res) => {
    const user = await usersModel.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
});

// ✅ Logout
app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});

// ✅ Books - Add Book
app.post("/books", async (req, res) => {
    try {
        const { title, coverImage } = req.body;
        const book = new Book({ title, coverImage });
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        console.error("Error saving book:", err);
        res.status(500).json({ error: "Failed to save book" });
    }
});

// ✅ Books - Get All
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).json({ message: "Error fetching books", error: err.message });
    }
});

// ✅ Books - Delete
app.delete("/books/:id", async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid book ID format" });
    }

    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ error: "Book not found" });

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
        console.error("Error deleting book:", err);
        res.status(500).json({ error: "Failed to delete book", details: err.message });
    }
});

// ✅ Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
