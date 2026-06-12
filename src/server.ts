import 'dotenv/config'
import express from 'express';
import authRouter from "./auth/auth.router.js";
import chatsRouter from "./chats/chats.router.js";
import {errorsMiddleware} from "./middlewares/errors/errors.middleware.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/', chatsRouter);
app.use(errorsMiddleware)


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
