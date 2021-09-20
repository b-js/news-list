import { IRssFrameRaw } from 'src/models/RssFrame';
import { xml2js } from 'xml-js';
import api from './HttpGateway';

export const getData = async (url: string, page: number) => {
  const result = await api(process.env.NODE_ENV === 'production' ? '' : `/${url}`, {
    method: 'get',
    responseType: 'json',
    params: {
      url,
      page,
    },
  });
  if (result.status !== 200) throw new Error(`Source ${url} is forbidden`);
  return (xml2js(result.data, { compact: true })) as unknown as IRssFrameRaw;
};
