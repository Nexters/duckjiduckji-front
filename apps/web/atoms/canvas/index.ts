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
  default:
    'https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80',
});
