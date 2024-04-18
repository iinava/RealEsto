import { app } from "./app.js";
import dotenv from "dotenv"



dotenv.config({
    path:'./.env'
})

app.listen( 8800, () => {
    console.log("Server is running on port 8800");
});

