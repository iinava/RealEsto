import express from "express";
import postRoute from "./routes/post.routes.js";
import authRoute from "./routes/auth.routes.js";
import userroute from "./routes/user.routes.js";
import chatroute from "./routes/chat.routes.js";
import messageroute from "./routes/message.routes.js";

import cookieparser from "cookie-parser"

const app = express();
app.use(cookieparser());

app.use(express.json());
app.use("/api/v1/post",postRoute)
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/user",userroute)
app.use("/api/v1/chats",chatroute)
app.use("/api/v1/messages",messageroute)

app.use("/api/v1/test",(req,res)=>{
    res.json({
        message: "Hello World"
    })
})

export {app}