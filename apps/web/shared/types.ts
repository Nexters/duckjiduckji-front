export interface IPolaroid {
  type: 'polaroid';
  id: string;
  x: number;
  y: number;
  rotation: number;
  isDragging: boolean;
  text: string;
  imgUrl: string;
  color: string;
}

export interface IPostIt {
  type: 'postIt';
  id: string;
  x: number;
  y: number;
  rotation: number;
  isDragging: boolean;
  color?: string;
  text?: string;
}

export interface ISticker {
  type: 'sticker';
  id: string;
  x: number;
  y: number;
  rotation: number;
  isDragging: boolean;
  imageURL: string;
}

export type UserAction = 'browse' | 'pinch';

export interface Coordinates {
  x: number;
  y: number;
}

export interface RoomData {
  background: { image: string };
  contentsEdtAt: number;
  createdAt: string;
  edtAt: string;
  headCount: number;
  id: string;
  owner: string;
  title: string;
}
