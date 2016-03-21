"use strict";

var logger = require("@magicworks/logger")
var connect = require("connect");

var currentTime = function(req, res, next) {
    res.setHeader("Content-Type", "text/plain");
    logger.info("Hello World! The current time is: " + new Date());
    res.end("Hello World! The current time is: " + new Date());
};

var healthcheck = function(req, res, next) {
    res.setHeader("Content-Type", "text/plain");
    res.end("mw-hello-world healthcheck! This is running version: " + process.env.CONTAINER_VERSION);
};

var rootPath = function(req, res, next) {
    res.setHeader("Content-Type", "text/plain");
    res.end("Hiya this is Hello World! You have two options /healthcheck or /currentTime");
};

connect()
    .use("/healthcheck", healthcheck)
    .use("/currentTime", currentTime)
    .use("/", rootPath)
    .listen(process.env.PORT || 8000);

logger.info("mw-hello-world has started!");