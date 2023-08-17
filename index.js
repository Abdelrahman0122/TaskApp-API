import express from "express";
import { dbConnect } from "./database/dbConnection.js";
import userRouter from "./src/modules/users/user.routes.js";
import taskRouter from "./src/modules/tasks/task.routes.js";
import { AppError } from "./src/utils/AppError.js";
import { globalError } from "./src/utils/globalErrorHandle.js";
const app = express();
const PORT = 3000;

app.use(express.json());
dbConnect();
app.use(userRouter);
app.use(taskRouter);



// global error handler
app.use(globalError);

app.use("*",(req,res,next)=>{
  // res.status(404).json({ err:`Not Found  ${req.originalUrl}`})
  next(new AppError(`Not Found  ${req.originalUrl}`,404))
})




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
