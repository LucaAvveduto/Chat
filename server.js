const fs = require("fs");
const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const conf = JSON.parse(fs.readFileSync("./conf.json"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/", express.static(path.join(__dirname, "public")));
const server = http.createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
    console.log("socket connected: " + socket.id);
    io.emit("chat", "new client: " + socket.id);
    socket.on('message', (message) => {
       const response = socket.id + ': ' + message;
       console.log(response);
       io.emit("chat", response);
    });
 });
server.listen(conf.port, () => {
  console.log("server running on port: " + conf.port);
});

