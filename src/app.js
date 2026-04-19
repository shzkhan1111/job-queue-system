const express = require("express");
const jobRoutes = require("./api/job.routes");

const app = express();

app.use(express.json());

app.use("/jobs", jobRoutes);

module.exports = app;