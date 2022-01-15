import dynamic from "next/dynamic";

const MainCanvas = dynamic(() => import("web/components/Canvas"), {
  ssr: false,
  loading: () => <p>LOADING...</p>,
});

interface Props {}

function Home({}: Props) {
  return (
    <>
      <MainCanvas />
    </>
  );
}

export default Home;
