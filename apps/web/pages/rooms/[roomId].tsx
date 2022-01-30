import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { canvasState, polaroidState } from 'web/atoms';

import { ActionBar } from 'web/components/layout/ActionBar';
import { MenuBar } from 'web/components/layout/MenuBar';
import { EditModal } from 'web/components/layout/EditModal';

const MainCanvas = dynamic(() => import('web/components/canvas/MainCanvas'), {
  ssr: false,
  loading: () => <p>LOADING...</p>,
});

interface Props {}

function WhiteBoard({}: Props) {
  const [isEditOpen, setEditOpen] = useState<boolean>(false);
  const [canvas, setCanvas] = useRecoilState(canvasState);
  const polaroid = useRecoilValue(polaroidState);

  return (
    <>
      {isEditOpen && <EditModal setEditOpen={setEditOpen} />}
      <ActionBar />
      <MenuBar setEditOpen={setEditOpen} />
      <MainCanvas isShown={isEditOpen} />
    </>
  );
}

export default WhiteBoard;
