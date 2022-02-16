import { API_SERVER } from '../constants/server';

interface Response {
  data: {
    background: string;
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

export async function createBoard(title: string) {
  const data = {
    title,
  };
  const response: Response = await fetch(`${API_SERVER}/rooms`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data),
  }).then(res => res.json());

  if (!response.success) return false;

  return response.data;
}
