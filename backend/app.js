import express from "express";
import site from "./route/web.js";
import cors from "cors";
import dotenv from "dotenv";
import "./model/db.js";
import "./model/allmodel.js";
import "./model/admin.js";
import { stu_route } from "./route/student.js";
import { admin_route } from "./route/admin.js";
import { join } from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(join(process.cwd(), "uploads"))); // Serves uploads/user

// ****** routing here ******
app.use("/", site);
app.use("/student", stu_route);
app.use("/admin", admin_route);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});