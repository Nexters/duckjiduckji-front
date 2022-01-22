const http = require("http");
const sockjs = require("sockjs");

const echo = sockjs.createServer();
echo.on("connection", (conn) => {
  conn.on("data", (message) => {
    console.log("get data!", message);
    conn.write(`'hello client! ${message}'`);
  });

  conn.on("close", () => {
    console.log("socket closed");
  });
});

const server = http.createServer();
echo.installHandlers(server, { prefix: "/echo" });
server.listen(9999, "0.0.0.0");
