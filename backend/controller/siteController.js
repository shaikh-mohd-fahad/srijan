const Home=(req,res)=>{
    console.log("home working");
    res.send("home working")
}
const Course=(req,res)=>{
    console.log("course working");
    res.send("course working")
}
export {Home,Course};