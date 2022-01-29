import { atom } from 'recoil';

export const canvasState = atom({
  key: 'canvasState',
  default: {
    polaroids: [],
    postIts: [],
  },
});
