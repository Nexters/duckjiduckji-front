import { atom, selector } from 'recoil';
import { SocketData, SocketResponseBody, SocketApi, PUBLISH_PATH } from 'socket-model';

export const socketState = atom<SocketData>({
  key: 'socketState',
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
  key: 'socketDataState',
  get: ({ get }) => get(socketState).data,
  set: ({ get, set }, nextState) => {
    /**
     * @TODO: Push shapesState
     * if (nextState.msgType === "polaroid") {
     *   set(polaroidState, nextState);
     * }
     */
    set(socketState, { ...get(socketState), data: { ...nextState } });
  },
});

export const socketApiState = atom<SocketApi>({
  key: 'socketApiState',
  default: {
    sendRoom: undefined,
  },
});

export const socketApiSelector = selector<SocketApi>({
  key: 'socketApiSelector',
  get: ({ get }) => {
    const { client, roomId } = get(socketState);
    if (!client || !roomId) {
      throw new Error(`SOCKET NOT CONNECTED`);
    }
    const sendRoom: SocketApi['sendRoom'] = data => {
      client.send(`${PUBLISH_PATH.ROOM}/${roomId}`, {}, JSON.stringify(data));
    };
    return { sendRoom };
  },
});
