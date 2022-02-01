export interface IPolaroid {
  id: string;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  isDragging: boolean;
  text: string;
  imgUrl: string;
}

export interface IPostIt {
  id: string;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  isDragging: boolean;
}

export type UserAction = 'browse' | 'pinch';

export interface Coordinates {
  x: number;
  y: number;
}
