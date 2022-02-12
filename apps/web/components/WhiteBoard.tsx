import { useState } from 'react';
import { MenuBar } from 'web/components/layout/MenuBar';
import { ActionBar } from 'web/components/layout/ActionBar';
import { EditModal } from 'web/components/layout/EditModal';
import { FloatingCircularMenu } from 'web/components/layout/FloatingCircularMenu';
import MainCanvas from 'web/components/canvas/MainCanvas';
interface Props {}

function WhiteBoard({}: Props) {
  const [isEditOpen, setEditOpen] = useState<boolean>(false);

  return (
    <div style={{ position: 'relative' }}>
      <MenuBar isEditOpen={isEditOpen} setEditOpen={setEditOpen} />
      {isEditOpen && <EditModal setEditOpen={setEditOpen} />}
      <ActionBar />
      <MainCanvas />
      {/* <FloatingCircularMenu /> */}
    </div>
  );
}

export default WhiteBoard;
