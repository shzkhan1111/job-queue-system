const { Redis } = require("ioredis");

const connection = new Redis({
  host: "localhost",
  port: 6379,
});

module.exports = connection;