import { IRssFrameRaw } from 'src/models/RssFrame';
import { xml2js } from 'xml-js';
import api from './HttpGateway';

export const getData = async (url: string, page: number) => {
  const result = await api(`/${url}`, {
    method: 'get',
    responseType: 'json',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    params: {
      page,
    },
  });
  if (result.status !== 200) throw new Error(`Source ${url} is forbidden`);
  return (xml2js(result.data, { compact: true })) as unknown as IRssFrameRaw;
};
