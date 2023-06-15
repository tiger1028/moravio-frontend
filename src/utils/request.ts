import axios, { Method } from 'axios';

interface RequestData {
  url: string;
  method: Method;
  data: unknown;
}

export const request = async ({ url, method, data }: RequestData) => {
  try {
    const responseData = await axios<unknown>({
      url,
      method,
      data,
    });

    return responseData.data;
  } catch (err) {
    return null;
  }
};
