import { useState } from 'react';
import { ActionBar } from 'web/src/components/layout/ActionBar';
import { EditModal } from 'web/src/components/layout/EditModal';
import { FloatingCircularMenu } from 'web/src/components/layout/FloatingCircularMenu';
import MainCanvas from 'web/src/components/canvas/MainCanvas';
interface Props {}

function WhiteBoard({}: Props) {
  const [isEditOpen, setEditOpen] = useState<boolean>(false);

  return (
    <div style={{ position: 'relative' }}>
      {isEditOpen && <EditModal setEditOpen={setEditOpen} />}
      <ActionBar />
      <MainCanvas />
      <FloatingCircularMenu />
    </div>
  );
}

export default WhiteBoard;
