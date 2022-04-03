import { API_SERVER } from '../constants/server';

import { RoomData } from 'web/shared/types';

interface Response {
  data: {
    contents: RoomData[];
    totalCount: number;
    pageInfo: null | string;
  };
  message: null | string;
  success: boolean;
}

export async function requestGetAllRooms() {
  const response: Response = await fetch(`${API_SERVER}/rooms`, {
    method: 'GET',
  })
    .then(res => res.json())
    .catch(e => ({}));

  if (!response.success) return false;

  return response.data;
}
