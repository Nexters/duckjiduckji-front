import { atom, selector } from 'recoil';

export interface CreateData {
  type: string | null;
  color: string | null;
  text: string | null;
}

export const createData = atom<CreateData>({
  key: 'createData',
  default: {
    type: null,
    color: null,
    text: null,
  },
});

export const changeColor = selector<string>({
  key: 'create-change_color',
  get: ({ get }) => get(createData).color,
  set: ({ get, set }, color) => {
    const data = get(createData);
    set(createData, { ...data, color });
  },
});

export const changeText = selector<string>({
  key: 'create-change_text',
  get: ({ get }) => get(createData).text,
  set: ({ get, set }, text) => {
    const data = get(createData);
    set(createData, { ...data, text });
  },
});

export const initData = selector({
  key: 'create-init_data',
  get: ({ get }) => get(createData),
  set: ({ set }) => {
    set(createData, {
      type: null,
      color: null,
      text: null,
    });
  },
});

export const changePostIt = selector<CreateData>({
  key: 'create-post it',
  get: ({ get }) => get(createData),
  set: ({ get, set }, postItData) => {
    set(createData, postItData);
  },
});
