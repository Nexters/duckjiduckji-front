import type { Client } from "stompjs";

export interface SocketResponseBody {
  msgType?: MESSAGE_TYPE;
  userId?: Pick<SocketData, "userId">;
  // @TODO: Add socket body interface.
  data?: any;
}

export enum CONTENT_TYPE {
  polaroid = "POLAROID",
  postIt = "POSTIT",
}

export interface PosterImage {
  link: string;
  order: number;
}

export interface ShapePosition {
  x: number;
  y: number;
}

export interface PosterData {
  width: number;
  height: number;
  point: ShapePosition;
  images?: PosterImage[];
  content?: string;
  color?: string;
  opacity?: number;
  font?: string;
  rotation?: number;
  background: {
    image: string | null;
    color: string | null;
  };
}

export interface CreatePoster {
  msgType: MESSAGE_TYPE;
  roomId: string;
  contentId: string | null;
  userId: string;
  contentType: CONTENT_TYPE;
  data: PosterData;
}

export interface DeletePoster
  extends Pick<
    CreatePoster,
    "msgType" | "roomId" | "contentType" | "contentId" | "userId"
  > {}

export interface SocketApi {
  sendRoom?: (data?: CreatePoster | DeletePoster) => void;
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
