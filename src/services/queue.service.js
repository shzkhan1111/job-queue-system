const { Queue } = require("bullmq");
const connection = require("../config/redis");

const emailQueue = new Queue("email-queue", {
  connection,
});

const addEmailJob = async (data) => {
  await emailQueue.add("send-email", data);
};

module.exports = {
  addEmailJob,
};