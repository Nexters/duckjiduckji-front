import { useRecoilValue } from 'recoil';
import { MESSAGE_TYPE, PUBLISH_PATH } from 'socket-model';
import { socketState } from '../atoms/socket';

const useSocket = () => {
  const socket = useRecoilValue(socketState);
  const { client, data, roomId, userId = 'test' } = socket;

  if (!client) throw new Error(`SOCKET NOT CONNECTED`);

  const leaveMessage = JSON.stringify({ msgType: MESSAGE_TYPE.LEAVE, userId });

  const leaveRoom = () => {
    client.send(`${PUBLISH_PATH.ROOM}/${roomId}`, {}, leaveMessage);
  };

  return {
    leaveRoom,
  };
};

export default useSocket;
