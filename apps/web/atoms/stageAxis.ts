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
  key: 'stageAxis-changeStageAxis',
  get: ({ get }) => get(setInitAxis),
  set: ({ set }, axis: StageAxisData) => {
    set(setInitAxis, axis);
  },
});
