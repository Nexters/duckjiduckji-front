import { atom, selector } from 'recoil';

interface CreateData {
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

export const changeColor = selector<{ color: string }>({
  key: 'create-change_color',
  get: ({ get }) => get(createData),
  set: ({ get, set }, color) => {
    set(createData, color);
  },
});

export const changeText = selector<{ text: string }>({
  key: 'create-change_text',
  get: ({ get }) => get(createData),
  set: ({ set }, text) => {
    set(createData, text);
  },
});
