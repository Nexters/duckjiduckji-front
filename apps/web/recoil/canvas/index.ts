import { atom, selector } from 'recoil';
import { POLAROID_OFFSET_HEIGHT, POLAROID_OFFSET_WIDTH } from 'web/shared/consts';
import { UserAction } from 'web/shared/types';

import { IPostIt } from 'web/shared/types';

// TEMP
function generatePostIts(): IPostIt[] {
  return [...Array(1)].map((_, i) => ({
    type: 'postIt' as const,
    id: `i${i.toString()}`,
    x: 100,
    y: 100,
    rotation: 0,
    isDragging: false,
  }));
}

export const shapesState = atom({
  key: 'shapesState',
  default: {
    polaroids: [
      {
        type: 'polaroid' as const,
        id: 'p0',
        x: 100,
        y: 100,
        rotation: 0,
        width: POLAROID_OFFSET_WIDTH,
        height: POLAROID_OFFSET_HEIGHT,
        isDragging: false,
        text: '',
        imgUrl: 'https://user-images.githubusercontent.com/27193396/151647337-5802e7c9-0004-4d4a-b134-322fc23d824e.png',
      },
    ],
    postIts: generatePostIts(),
  },
});

export const polaroidState = selector({
  key: 'polaroidState',
  get: ({ get }) => {
    const canvas = get(shapesState);
    return canvas.polaroids;
  },
});

export const postItState = selector({
  key: 'postItState',
  get: ({ get }) => {
    const canvas = get(shapesState);
    return canvas.postIts;
  },
  set: ({ set }, newState) => {
    set(shapesState, newState);
  },
});

export const userActionState = atom<UserAction>({
  key: 'userActionState',
  default: 'browse',
});
