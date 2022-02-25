import { atom, selector } from 'recoil';
import { IPolaroid, IPostIt, UserAction } from 'web/shared/types';

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
    postIts: [],
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

export const backgroundState = atom<string>({
  key: 'backgroundState',
  default: '',
});
