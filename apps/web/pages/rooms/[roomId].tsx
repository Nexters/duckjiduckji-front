import dynamic from "next/dynamic";
import React, { useState } from "react";

import { ActionBar } from "../../components/layout/ActionBar";
import { MenuBar } from "../../components/layout/MenuBar";
import { EditModal } from "../../components/layout/EditModal";

const MainCanvas = dynamic(() => import("web/components/Canvas"), {
  ssr: false,
  loading: () => <p>LOADING...</p>,
});

interface Props {}

function WhiteBoard({}: Props) {
  const [isEditOpen, setEditOpen] = useState<boolean>(false);

  return (
    <>
      {isEditOpen && <EditModal setEditOpen={setEditOpen} />}
      <ActionBar />
      <MenuBar setEditOpen={setEditOpen} />
      <MainCanvas />
    </>
  );
}

export default WhiteBoard;
