import express from "express"
import site from "./route/web.js";
const app=express();
const PORT=process.env.PORT||3000
app.use("/",site)
app.listen(PORT);