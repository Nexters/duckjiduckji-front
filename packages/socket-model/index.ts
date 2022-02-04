import type { Client } from "stompjs";

export interface SocketResponseBody {
  msgType?: MESSAGE_TYPE;
  userId?: Pick<SocketData, "userId">;
  // @TODO: Add socket body interface.
  data?: any;
}

export interface SocketData {
  // @TODO: roomId and userId need to move to userState.
  roomId?: string;
  userId?: string;
  client?: Client;
  // @TODO: Add socket subscriber observer.
  data?: SocketResponseBody;
}

export enum SERVER_PATH {
  MOCK = "http://localhost:9999/ws",
  PRODUCTION = "http://118.32.152.106:30000",
}

export enum PUBLISH_PATH {
  ROOM = "/publish/room",
  TEST_ROOM = "/publish/room/wtf",
}

export enum SUBSCRIBE_PATH {
  ROOM = "/subscribe/room",
  TEST_ROOM = "/subscribe/room/wtf",
}

export enum MESSAGE_TYPE {
  JOIN = "JOIN",
  LEAVE = "LEAVE",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DRAG = "DRAG",
  DELETE = "DELETE",
  ERROR = "ERROR",
}
