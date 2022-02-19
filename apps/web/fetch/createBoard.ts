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

export async function requestCreateBoard(title: string) {
  const data = {
    background: {},
    headCount: 100,
    title,
  };

  const response: Response = await fetch(`${API_SERVER}/rooms`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());

  if (!response.success) return false;

  return response.data;
}
