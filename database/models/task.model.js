import { Schema, Types, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["ToDo", "doing", "done"],
      default: "ToDo",
    },
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: "user",
    },
    assignTo: {
      type: Types.ObjectId,
      required: true,
      ref: "user",
    },
    deadLine: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const taskModel = model("task", taskSchema);
