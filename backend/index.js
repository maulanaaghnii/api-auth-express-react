import express from "express"
//import Users from "./models/UserModel.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import db from "./config/database.js"
import router from "./routes/index.js"

dotenv.config()
const port = 5000
const app = express()

try{
    await db.authenticate()
    console.log("Database konek")
    //await db.sync();
}catch (err){
    //console.error(err)
    console.log("Database gak konek")
}

app.use(cors({credentials:true, origin:'http://localhost:3000'}))
app.use(cookieParser())
app.use(express.json())
app.use(router)
app.listen(port, ()=> console.log("Server Running at port :" + port))