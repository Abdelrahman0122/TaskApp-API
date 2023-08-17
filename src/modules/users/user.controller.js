import { userModel } from "../../../database/models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { handleError } from "../../middleware/handleAsyncError.js";
import { AppError } from "../../utils/AppError.js";
import Joi from "joi";
import { sendEmail } from "../../email/sendEmail.js";

//1-Sign Up

const signUp = handleError(async (req, res, next) => {
  const { userName, email, password, cpassword, age, gender, phone } = req.body;

  if (password == cpassword) {
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      next(new AppError("User already exist", 409));
    } else {
      const hash = bcrypt.hashSync(password, 8);
      const addUser = await userModel.insertMany({
        userName,
        email,
        password: hash,
        age,
        gender,
        phone,
      });
      let verifyToken = jwt.sign({ id: addUser[0]._id }, "abdo");
      sendEmail({ email, api: `http://localhost:3000/verify/${verifyToken}` });
      res.json({ Message: "User added succesfully", addUser });
    }
  } else {
    res.json({ Message: "Password and conform password doesn't match" });
  }
});

//1-Sign In

const signIn = handleError(async (req, res, next) => {
  const { email, password } = req.body;
  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    let match = bcrypt.compareSync(password, isUserExist.password);
    if (match) {
      await userModel.findOneAndUpdate(
        { _id: isUserExist._id },
        {
          isOnline: true,
          isDeleted: false,
        },
        { new: true }
      );

      let token = jwt.sign(
        { id: isUserExist._id, email: isUserExist.email },
        "pass"
      );
      res.json({ Message: "User logged succesfully with token", token });
    } else {
      next(new AppError("Password is not correct", 401));
    }
  } else {
    next(new AppError("User does not exist", 404));
  }
});

// 3-changePassword

const changePassword = handleError(async (req, res, next) => {
  let { _id } = req.user;
  let { oldPassword, newPassword, cPassword } = req.body;

  if (newPassword === cPassword) {
    let match = bcrypt.compareSync(oldPassword, req.user.password);

    if (match) {
      const hash = bcrypt.hashSync(newPassword, 8);
      let updatedPassword = await userModel.updateOne(
        { _id },
        { password: hash }
      );
      res.json({ Message: "Password Changed Successfully!", updatedPassword });
    } else {
      next(new AppError("Old Password is not correct", 401));
    }
  } else {
    next(new AppError("New Password and Confirm Password does not match", 401));
  }
});

//4-Update User

const updateUser = handleError(async (req, res, next) => {
  const { _id } = req.user;
  const { userName, phone, age } = req.body;
  let updatedUser = await userModel.findByIdAndUpdate(
    { _id },
    { userName, phone, age },
    { new: true }
  );

  if (updateUser) {
    res.json({ Message: "User updated succesfully", updateUser });
  } else {
    next(new AppError("User was not found", 404));
  }
});
//5-delete user(user must be logged in)

const deleteUser = handleError(async (req, res, next) => {
  const { _id } = req.user;
  const userDelete = await userModel.findByIdAndDelete({ _id });

  if (userDelete) {
    res.json({ Message: "User deleted succesfully", userDelete });
  } else {
    next(new AppError("User was not found", 404));
  }
});

//6-soft delete(user must be logged in)
const softDelete = handleError(async (req, res, next) => {
  const { _id } = req.user;

  let updateUser = await userModel.findOneAndUpdate(
    { _id },
    { isDeleted: true, isOnline: false },
    { new: true }
  );

  if (updateUser) {
    res.json({ Message: "User soft deleted succesfully", updateUser });
  } else {
    next(new AppError("User was not found", 404));
  }
});

//7-logout

const logOut = handleError(async (req, res, next) => {
  const { _id } = req.user;

  let updateUser = await userModel.findOneAndUpdate(
    { _id },
    { isOnline: false },
    { new: true }
  );
  if (updateUser) {
    res.json({ Message: "User logout succesfuly", updateUser });
  } else {
    next(new AppError("User was not found", 404));
  }
});

//8- send email

const verifyEmail = handleError(async (req, res, next) => {
  let { token } = req.params;
  jwt.verify(token, "abdo", async (err, decoded) => {
    if (err) {
      return res.json({ message: "err", err });
    }
  let Updateduser =   await userModel.findByIdAndUpdate(decoded.id , {isVerified:true},{new:true})
  res.json({message:"success",Updateduser})
});
});

export {
  verifyEmail,
  signUp,
  signIn,
  changePassword,
  updateUser,
  deleteUser,
  softDelete,
  logOut,
};
