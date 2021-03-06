import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { MenuBar } from 'web/components/layout/MenuBar';
import { ActionBar } from 'web/components/layout/ActionBar';
import { EditModal } from 'web/components/layout/EditModal';
import { FloatingCircularMenu } from 'web/components/layout/FloatingCircularMenu';
import MainCanvas from 'web/components/canvas/MainCanvas';

import { requestGetRoom } from 'web/fetch/getRoom';

import { RoomData } from 'web/shared/types';

interface Props {}

function WhiteBoard({}: Props) {
  const router = useRouter();

  const [roomData, setRoomData] = useState<RoomData>();
  useEffect(() => {
    const { roomId: id } = router.query;

    requestGetRoom(id as string).then((response: RoomData) => {
      setRoomData(response);
    });
  }, []);

  const [isEditOpen, setEditOpen] = useState<boolean>(false);
  const [type, setType] = useState<'postit' | 'polaroid' | 'sticker'>();

  return (
    <div style={{ position: 'relative' }}>
      <div></div>
      <MenuBar isEditOpen={isEditOpen} setEditOpen={setEditOpen} setType={setType} />
      {isEditOpen && <EditModal setEditOpen={setEditOpen} type={type} />}
      <ActionBar title={(roomData && roomData?.title) || ''} />
      <MainCanvas />
      {/* <FloatingCircularMenu /> */}
    </div>
  );
}

export default WhiteBoard;
