console.clear();

require("dotenv").config();
const express = require("express");
const SERVER = require("./__main__/main.js");
const router = require("./__main__/router.js" );
const engine = express().use(express.json()).use(require("cors")());

engine.use("/api", router);

console.time("execution");

// CONF ENGINE
SERVER.conf.server
    .set(engine)
    .then((res) => {
        console.log(res);
        // CONF MONGO URL
        SERVER.conf.db.url
            .set(process.env.mongodb)
            .then((res) => {
                console.log(res);

                // CONF PORT
                SERVER.conf.port
                    .set(process.env.port)
                    .then((res) => {
                        console.log(res);

                        // CREATE CONNECTION
                        SERVER.connect()
                            .then((res) => {
                                console.log(res);

                                // START SERVER
                                SERVER.start()
                                    .then((res) => {
                                        console.log(res);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .catch((err) => {
        console.log(err);
    });

console.timeEnd("execution");

