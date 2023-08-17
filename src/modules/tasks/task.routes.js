import express from "express";
import { auth } from "../../middleware/auth.js";
import {
  addTask,
  deleteTask,
  getAllTasks,
  getTasksOfOneUser,
  updateTask,
} from "./task.controller.js";
const router = express.Router();

router.post("/addTask", auth, addTask);
router.put("/updateTask/:_id", auth, updateTask);
router.delete("/deleteTask/:_id", auth, deleteTask);
router.get("/getAllTasks", auth, getAllTasks);
router.get("/getTasksOfOneUser", auth, getTasksOfOneUser);

export default router;
