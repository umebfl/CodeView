const express = require("express");
const app = express();

const uploadServerData = require("./json/uploadServer.json");

app.get("/uploadServer", function (req, res) {
    console.log("/uploadServer");
    res.json(uploadServerData);
});

app.listen(8000);
