import { cousreModel } from "../model/course.js"

export const siteFetchCourse=async (req,res)=>{

    try {
        const { condition, limit } = req.params;
        // console.log("condtion: ",condition, limit)
        let query = {};
        if (condition === "new") {
            const result=await cousreModel.find().limit(parseInt(limit) || 0).sort({ _id: -1 })
            return res.json(result)

        } else if (condition === "trending") {
            query = { trending: "yes" };
            const result=await cousreModel.find(query).limit(parseInt(limit) || 0)
            return res.json(result)
            

        } else if (condition === "" || !condition) {
            const result=await cousreModel.find().limit(parseInt(limit) || 0)
            return res.json(result)
        }

     

    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Error fetching courses' });
    }

    
}