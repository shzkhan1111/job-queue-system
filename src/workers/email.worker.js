const { Worker, Queue } = require("bullmq");
const connection = require("../config/redis");

const worker = new Worker(
  "email",
  async (job) => {
    console.log("Processing job:", job.name);
    console.log("Data:", job.data);

    // Simulate email sending (heavy task)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { to, subject } = job.data;
    console.log(`Email sent to ${to}: ${subject}`);
    return { sent: true };
  },
  { connection, concurrency: 5 }
);

// Simple failure capture queue
const failedEmailQueue = new Queue("failed-email", { connection });

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", async (job, err) => {
  // If this was the last retry, enqueue to failed queue
  const attempts = job?.opts?.attempts || 3;
  if (job?.attemptsMade >= attempts) {
    await failedEmailQueue.add("dead-email", {
      originalData: job.data,
      error: err?.message,
      failedAt: new Date().toISOString(),
      name: job.name,
    });
  }
  console.error(`Job ${job?.id} failed:`, err?.message);
});
