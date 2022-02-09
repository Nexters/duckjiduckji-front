import dynamic from 'next/dynamic';
import SocketProvider from 'web/components/SocketProvider';

const WhiteBoard = dynamic(() => import('web/components/WhiteBoard'), {
  ssr: false,
  loading: () => <p>LOADING...</p>,
});

interface Props {}

function Room({}: Props) {
  return (
    <SocketProvider>
      <WhiteBoard />
    </SocketProvider>
  );
}

export default Room;
