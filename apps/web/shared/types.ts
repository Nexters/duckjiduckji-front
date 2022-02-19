export interface IPolaroid {
  type: 'polaroid';
  id: string;
  x: number;
  y: number;
  rotation: number;
  isDragging: boolean;
  text: string;
  imgUrl: string;
}

export interface IPostIt {
  type: 'postIt';
  id: string;
  x: number;
  y: number;
  rotation: number;
  isDragging: boolean;
}

export type UserAction = 'browse' | 'pinch';

export interface Coordinates {
  x: number;
  y: number;
}
