import dynamic from "next/dynamic";
import { useState } from "react";
import { ActionBar } from "web/components/layout/ActionBar";
import { MenuBar } from "web/components/layout/MenuBar";
import { EditModal } from "web/components/layout/EditModal";
import SocketProvider from "web/components/SocketProvider";

const MainCanvas = dynamic(() => import("web/components/Canvas"), {
  ssr: false,
  loading: () => <p>LOADING...</p>,
});

interface Props {}

function WhiteBoard({}: Props) {
  const [isEditOpen, setEditOpen] = useState<boolean>(false);

  return (
    <SocketProvider>
      {isEditOpen && <EditModal setEditOpen={setEditOpen} />}
      <ActionBar />
      <MenuBar setEditOpen={setEditOpen} />
      <MainCanvas isShown={isEditOpen} />
    </SocketProvider>
  );
}

export default WhiteBoard;
