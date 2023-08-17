import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/assignment7")
    .then(() => {
      console.log("DB Connected Succesfuly 🍾");
    })
    .catch(() => {
      console.log("DB Failed to connect 🚫");
    });
};
