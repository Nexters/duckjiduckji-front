import { atom, selector } from 'recoil';
import { IPolaroid, IPostIt, UserAction } from 'web/shared/types';

// TEMP
function generatePostIts() {
  return [...Array(1)].map((_, i) => ({
    type: 'postIt' as const,
    id: `i${i.toString()}`,
    x: 100,
    y: 100,
    rotation: 0,
    isDragging: false,
  }));
}

export const shapesState = atom<{ polaroids: IPolaroid[]; postIts: IPostIt[] }>({
  key: 'shapesState',
  default: {
    polaroids: [
      {
        type: 'polaroid' as const,
        id: 'p0',
        x: 100,
        y: 100,
        rotation: 0,
        isDragging: false,
        text: '',
        imgUrl: '',
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
});

export const userActionState = atom<UserAction>({
  key: 'userActionState',
  default: 'browse',
});
