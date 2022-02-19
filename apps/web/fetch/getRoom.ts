import { API_SERVER } from '../constants/server';

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

interface Response {
  data: {
    background: { image: string };
    contentsEdtAt: number;
    createdAt: string;
    edtAt: string;
    headCount: number;
    id: string;
    owner: string;
    title: string;
  };
  message: string;
  success: boolean;
}

export async function requestGetRoom(id: string) {
  const response: Response = await fetch(`${API_SERVER}/rooms/${id}`, {
    method: 'GET',
  }).then(res => res.json());

  if (!response.success) return false;

  return response.data;
}
