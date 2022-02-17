import sockjs from 'sockjs-client';
import stomp from 'stompjs';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { socketDataState, socketState } from '../atoms/socket';
import { SocketResponseBody, MESSAGE_TYPE, PUBLISH_PATH, SERVER_PATH, SUBSCRIBE_PATH } from 'socket-model';

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useRecoilState(socketState);
  const [socketData, setSocketData] = useRecoilState(socketDataState);

  const router = useRouter();

  useEffect(() => {
    if (process.env.NEXT_IS_SERVER) return;
    const roomId = router.query.roomId as string;
    if (!roomId) return;

    // @TODO: Get USER_ID from store.
    const userId = 'userId123';
    const socketURL = process.env.NODE_ENV === 'production' ? SERVER_PATH.PRODUCTION : SERVER_PATH.MOCK;

    const sock = new sockjs(socketURL);
    const stompClient = stomp.over(sock);

    const sendJoinNoti = () => {
      stompClient.send(`${PUBLISH_PATH.ROOM}/${roomId}`, {}, JSON.stringify({ msgType: MESSAGE_TYPE.JOIN, userId }));
    };
    const subscribeRoomAllNoti = () => {
      stompClient.subscribe(`${SUBSCRIBE_PATH.ROOM}/${roomId}`, res => {
        // @TODO: Need to parse handler.
        const resBody = JSON.parse(res.body) as SocketResponseBody;
        setSocketData(resBody);
      });
    };

    stompClient.connect(
      {},
      () => {
        sendJoinNoti();
        subscribeRoomAllNoti();

        setSocket(state => ({
          ...state,
          roomId,
          userId,
          client: stompClient,
        }));
      },
      e => {
        // @TODO: Need to redirect(e.g. Server down)
        console.log('get error', e);
      },
    );
  }, [router.query.roomId, setSocket, setSocketData]);

  return <>{children}</>;
};

export default SocketProvider;
