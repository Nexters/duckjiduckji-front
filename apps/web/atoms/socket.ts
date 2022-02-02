import { atom, selector } from "recoil";
import { SocketData, SocketResponseBody } from "socket-model";

export const socketState = atom<SocketData>({
  key: "socketState",
  default: {
    client: undefined,
    roomId: undefined,
    userId: undefined,
    data: {
      msgType: undefined,
      userId: undefined,
    },
  },
});

export const socketDataState = selector<SocketResponseBody>({
  key: "socketDataState",
  get: ({ get }) => get(socketState).data,
  set: ({ get, set }, nextState) => {
    set(socketState, { ...get(socketState), data: { ...nextState } });
  },
});
