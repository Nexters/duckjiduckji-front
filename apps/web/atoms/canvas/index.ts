import { atom, selector } from 'recoil';
import { IPolaroid, IPostIt, UserAction, ISticker } from 'web/shared/types';

export const shapesState = atom<{ polaroids: IPolaroid[]; postIts: IPostIt[]; stickers: ISticker[] }>({
  key: 'shapesState',
  default: {
    polaroids: [],
    postIts: [],
    stickers: [],
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

export const stickerState = selector({
  key: 'stickerState',
  get: ({ get }) => {
    const canvas = get(shapesState);
    return canvas.stickers;
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
  default: '/assets/image/backgrounds/background2.png',
});
