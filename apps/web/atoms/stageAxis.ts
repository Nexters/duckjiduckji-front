import { atom, selector } from 'recoil';

interface StageAxisData {
  y: number;
  x: number;
}

export const setInitAxis = atom<StageAxisData>({
  key: 'setInitAxis',
  default: {
    y: 0,
    x: 0,
  },
});

export const changeStageAxis = selector<StageAxisData>({
  key: 'create-change_color',
  get: ({ get }) => get(setInitAxis),
  set: ({ set }, axis: StageAxisData) => {
    set(changeStageAxis, axis);
  },
});
