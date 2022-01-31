export interface IPolaroid {
  id: string;
  x: number;
  y: number;
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
  width: number;
  height: number;
  isDragging: boolean;
}
