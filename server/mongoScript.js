const Task = require("./models/task");
const mongoose = require("mongoose");
const { TASK_TYPE } = require("./constant");

const dbURI =
  process.env.DB_URL ||
  "mongodb+srv://sih:sih@cluster0.smvmbq5.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Running...");
  })
  .catch((err) => console.log(err.message));

const createTask = async () => {
  const task = await Task.create({
    title: "Do homework",
    endTime: new Date("2022-08-25"),
    isCompleted: false,
    type: TASK_TYPE.,
  });

  console.log(task);
  process.exit();
};

createTask();
