// src/server.ts
// import express from 'express';
// import dotenv from 'dotenv';
// import cors, { CorsOptions } from 'cors';
// import articlesRouter from './routes/articles';
// import userRouter from './routes/user';
// import commentsRouter from './routes/comments';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// const allowedOrigins = [
//   'http://localhost:3000', // Local development
//   'https://allnews-frontend.onrender.com' // Deployed frontend (replace with your actual URL)
// ];

// const corsOptions: CorsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.use(express.json());
// app.use('/api/articles', articlesRouter);
// app.use('/api/users', userRouter);
// app.use('/api/comments', commentsRouter);

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });




import express from 'express';
import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';
import articlesRouter from './routes/articles';
import userRouter from './routes/user';
import commentsRouter from './routes/comments';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://allnews1-0.onrender.com' // Deployed frontend
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/articles', articlesRouter);
app.use('/api/users', userRouter);
app.use('/api/comments', commentsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

