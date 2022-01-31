import { atom, selector } from 'recoil';
import { POLAROID_HEIGHT, POLAROID_WIDTH, POSTIT_HEIHT, POSTIT_WIDTH } from 'web/src/shared/consts';

// TEMP
function generatePostIts() {
  return [...Array(5)].map((_, i) => ({
    type: 'postIt',
    id: i.toString(),
    x: Math.random() * 1000,
    y: Math.random() * 1000,
    width: POSTIT_WIDTH,
    height: POSTIT_HEIHT,
    isDragging: false,
  }));
}

export const shapesState = atom({
  key: 'shapesState',
  default: {
    polaroids: [
      {
        type: 'polaroid',
        id: '1',
        x: 300,
        y: 300,
        width: POLAROID_WIDTH,
        height: POLAROID_HEIGHT,
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
});

export const userActionState = atom({
  key: 'userActionState',
  default: 'browse',
});
