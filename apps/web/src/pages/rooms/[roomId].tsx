import dynamic from 'next/dynamic';

const WhiteBoard = dynamic(() => import('web/src/components/WhiteBoard'), {
  ssr: false,
  loading: () => <p>LOADING...</p>,
});

interface Props {}

function Room({}: Props) {
  return <WhiteBoard />;
}

export default Room;
