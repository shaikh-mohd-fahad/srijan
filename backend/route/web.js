import express from "express"
import { fetchCourseId, siteFetchCourse} from "../controller/siteController.js";


const site=express.Router();
//here condition must be like new course, trending etc
site.get("/fetchcourse/:condition?/:limit?",siteFetchCourse)
site.get("/fetchcourseid/:id",fetchCourseId)
export default site;