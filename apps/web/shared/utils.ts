import axios from 'axios';

export async function uploadFile(file: File, roomId: string) {
  const formData = new FormData();
  formData.append('roomId', roomId);
  formData.append('img', file);
  try {
    const response = await axios.post(`http://118.32.152.106:50000/img`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response?.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
