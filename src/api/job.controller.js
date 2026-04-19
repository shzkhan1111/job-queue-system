const { addEmailJob } = require("../services/queue.service");

const createEmailJob = async (req, res) => {
  try {
    const { email, message } = req.body;

    await addEmailJob({ email, message });

    res.json({
      success: true,
      message: "Job added to queue",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createEmailJob,
};