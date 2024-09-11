import express from "express"
import {Home,Course} from "../controller/siteController.js";
const site=express.Router();
site.get("/",Home)
site.get("/course",Course)
export default site;