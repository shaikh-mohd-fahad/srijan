import { studentModel } from "../model/student.js";
export const userLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //temp email =fahad@gmail.com and password=123456
  try {
    const isValid = await studentModel.findOne({
      email: email,
      password: password,
    });
    if (!isValid) {
      res.json({ success: false, message: "Email or Password is wrong" });
    }
    res.json({ success: true, message: "You are logged in..." });
  } catch (error) {
    console.log("login error  ", error);
  }
};
export const userSignup = async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const fullname = req.body.fullname;
  const password = req.body.password;
    // console.log(req.body)
  try {
    const chechEmail = await studentModel.findOne({
      email: email,
    });
    if (chechEmail) {
      return res.json({
        success: false,
        message: "Email is already Registered",
      });
    }
    const user = await studentModel({
      username,
      email,
      fullname,
      password,
    });
    user.save();
    if (user) res.json({ success: true, message: "Account Created" });
    else res.json({ success: true, message: "Registration failled" });
  } catch (error) {
    console.log("login error  ", error);
  }
};
