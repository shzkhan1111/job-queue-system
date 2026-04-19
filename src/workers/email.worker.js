const { Worker } = require("bullmq");
const connection = require("../config/redis");

const worker = new Worker(
  "email-queue",
  async (job) => {
    console.log("Processing job:", job.name);
    console.log("Data:", job.data);

    // Simulate email sending (heavy task)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const { to, subject, body } = job.data;
    console.log(`Email sent to ${to}: ${subject}`);
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
});