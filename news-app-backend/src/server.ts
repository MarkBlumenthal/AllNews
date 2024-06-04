// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import articlesRouter from './routes/articles';
import userRouter from './routes/user';
import commentsRouter from './routes/comments';
import path from 'path'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true,
}));
app.use(express.json());
app.use('/api/articles', articlesRouter);
app.use('/api/users', userRouter);
app.use('/api/comments', commentsRouter);

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.static(path.join(__dirname, "../news-app-backend/dist")));
// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../news-app-frontend/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


