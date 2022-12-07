import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js"
import authUser from "./middleware/auth.js"
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/postController.js";

import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// ROUTES WITH FILE UPLOAD
app.post("/api/v1/auth/register", upload.single("picture"), register);
app.post("/api/v1/createPost",authUser, upload.single("picture"), createPost);

// ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users",userRouter)
app.use("/api/v1/posts",postRouter)

// CONNECTING TO MONGODB
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_ONLINE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Database connection established, Server listening on ${PORT}`
      )
    );
    /* ADD DATA ONE TIME */

    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((err) => console.log(`${err} did not connect to Mongo`));
