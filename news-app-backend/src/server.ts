// src/server.ts
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import articlesRouter from './routes/articles';
// import userRouter from './routes/user';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());
// app.use('/api/articles', articlesRouter);
// app.use('/api/users', userRouter);

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });





// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import articlesRouter from './routes/articles';
import userRouter from './routes/user';
import commentsRouter from './routes/comments'; // Ensure this path is correct

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/articles', articlesRouter);
app.use('/api/users', userRouter);
app.use('/api/comments', commentsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
