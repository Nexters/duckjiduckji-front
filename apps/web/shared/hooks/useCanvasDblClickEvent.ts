import { KonvaEventObject } from 'konva/lib/Node';
import { useCallback, useMemo } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { setRecoil, getRecoil } from 'recoil-nexus';

import { userActionState } from 'web/atoms';

export function useCanvasDblClickEvent() {
  const userAction = getRecoil(userActionState);
  const handleDblClick = useCallback(
    (target, e: KonvaEventObject<MouseEvent>) => {
      setRecoil(userActionState, userAction === 'dblClick' ? 'browse' : 'dblClick');
    },
    [userAction],
  );

  return { handleDblClick };
}
