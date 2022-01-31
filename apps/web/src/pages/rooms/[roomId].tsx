import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { ActionBar } from 'web/src/components/layout/ActionBar';
import { EditModal } from 'web/src/components/layout/EditModal';
import { userActionState } from '../../atoms';

const MainCanvas = dynamic(() => import('web/src/components/canvas/MainCanvas'), {
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
