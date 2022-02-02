import http from "http";
import { PUBLISH_PATH, SUBSCRIBE_PATH } from "socket-model";
import { yellowFormat, logger } from "./winston";
// @NOTE: Stomp-broker-js doesn't support ESM.
const StompServer = require("stomp-broker-js");

const server = http.createServer((req, res) => {
  logger.info(yellowFormat(`[HTTP] ${req.url}`));
  res.write("pong");
  res.end();
});

const stompServer = new StompServer({
  server,
  debug: console.log,
  path: "/ws",
  protocol: "sockjs",
  heartbeat: [2000, 2000],
});

stompServer.subscribe(PUBLISH_PATH.TEST_ROOM, (msg, headers) => {
  const topic = headers.destination;
  logger.info(`${yellowFormat(`[RECEIVED] ${topic}`)}\n${msg}`);

  const data = JSON.parse(msg);
  const { msgType, userId } = data;

  let isNeedPublish = false;
  const resBody = { msgType, userId, data: {} };

  if (msgType === "JOIN") {
    isNeedPublish = true;
    // @TODO: Add socket data format.
    // https://www.notion.so/Socket-Data-adbb5e75c534430eb7faba899e2d9efe
    resBody.data = { msg: `Hello from server! ${userId}` };
  }

  if (!isNeedPublish) return;

  const stringifiedBody = JSON.stringify(resBody);
  logger.info(
    `${yellowFormat(`[SEND] ${SUBSCRIBE_PATH.TEST_ROOM}`)}\n${stringifiedBody}`
  );

  stompServer.send(SUBSCRIBE_PATH.TEST_ROOM, headers, stringifiedBody);
});

server.listen(9999);
