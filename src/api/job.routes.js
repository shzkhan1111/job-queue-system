const express = require("express");
const router = express.Router();
const { createEmailJob } = require("./job.controller");

router.post("/email-job", createEmailJob);

module.exports = router;