import dynamic from "next/dynamic";

const MainCanvas = dynamic(() => import("web/components/Canvas"), {
  ssr: false,
  loading: () => <p>LOADING...</p>,
});

interface Props {}

function WhiteBoard({}: Props) {
  return (
    <>
      <MainCanvas />
    </>
  );
}

export default WhiteBoard;
