import jwt from "jsonwebtoken";
import { userModel } from "../../database/models/user.model.js";

export const auth = async (req, res, next) => {
  try {
    let { token } = req.headers;

    let decode = jwt.verify(token, "pass");

    if (decode) {
      let user = await userModel.findById(decode.id);
      if (user) {
        if (user.isDeleted) {
          return res.json("This Email is deleted");
        } else if (!user.isOnline) {
          return res.json("User is not logged in yet");
        } else {
          req.user = user;
          next();
        }
      } else {
        return res.json("User was not found");
      }
    } else {
      return res.json({ Message: "Token was not found" });
    }
  } catch (error) {
    return res.json({
      Message: "Authentication failed. Invalid token.",
      error,
      console: console.log(error),
    });
  }
};
