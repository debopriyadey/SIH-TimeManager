const Task = require("../models/task");

exports.getHeatMap = async (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  const tasks = await Task.find({
    $and: [
      { endTime: { $gte: new Date(startDate) } },
      { endTime: { $lte: new Date(endDate) } },
      { type: "normal" },
    ],
  });

  if (!tasks) {
    res.status(200).json({ message: "No Task Found" });
  }

  const datesMap = new Map();

  tasks.forEach((task) => {
    const endTime = task.endTime.toISOString().split("T")[0];
    if (task.isCompleted) {
      if (!datesMap.has(endTime)) {
        datesMap.set(endTime, 0);
      }
      // console.log(typeof endTime);
      datesMap.set(endTime, datesMap.get(endTime) + 1);
    }
  });

  var result = Array.from(datesMap).map(([date, count]) => {
    return {
      date: date,
      count: count,
    };
  });

  return res.status(200).json(result);
};

// start end end date -> fetch tasks between these dates ->

exports.getPieChart = async (req, res) => {
  // Completed
  // InCompleted
  // rescheduled
  // late completeion
  // late started
  let completed = 0,
    inCompleted = 0,
    rescheduled = 0,
    completedLate = 0,
    startedLate = 0;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  const tasks = await Task.find({
    $and: [
      { endTime: { $gte: new Date(startDate) } },
      { endTime: { $lte: new Date(endDate) } },
      { type: "normal" },
    ],
  });

  if (!tasks) {
    res.status(200).json({ message: "No Task Found" });
  }

  tasks.forEach((task) => {
    if (task.isCompleted) ++completed;
    else ++inCompleted;
    if (task.timesRescheduled > 0) ++rescheduled;
    if (task.isLateStarted) ++startedLate;
    if (task.isLateCompleted) ++completedLate;
  });

  return res.status(200).json({
    completed,
    inCompleted,
    rescheduled,
    startedLate,
    completedLate,
  });
};

exports.getBarChart = (req, res) => {};
