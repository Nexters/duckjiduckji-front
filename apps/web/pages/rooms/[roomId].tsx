import dynamic from "next/dynamic";

import { ActionBar } from "../../components/layout/ActionBar";
import { MenuBar } from "../../components/layout/MenuBar";

const MainCanvas = dynamic(() => import("web/components/Canvas"), {
  ssr: false,
  loading: () => <p>LOADING...</p>,
});

interface Props {}

function WhiteBoard({}: Props) {
  return (
    <>
      <ActionBar />
      <MenuBar />
      <MainCanvas />
    </>
  );
}

export default WhiteBoard;
