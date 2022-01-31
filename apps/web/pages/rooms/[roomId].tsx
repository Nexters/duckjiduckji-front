import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ActionBar } from 'web/components/layout/ActionBar';
import { EditModal } from 'web/components/layout/EditModal';

const MainCanvas = dynamic(() => import('web/components/canvas/MainCanvas'), {
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
      <MainCanvas />
    </>
  );
}

export default WhiteBoard;
