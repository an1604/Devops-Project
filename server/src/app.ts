import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute";
import dotenv from "dotenv";
import cors from "cors";
import postRoute from "./routes/postRoute";
import userRoute from "./routes/userRoute";
import fileRoute from "./routes/fileRoute";
import commentRoute from "./routes/commentsRoute";

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Express configuration
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors());

app.use("/auth", authRoute);
app.use("/posts", postRoute);
app.use("/user", userRoute);
app.use("/file", fileRoute);
app.use("/comments", commentRoute);

app.use("/public", express.static("public"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
