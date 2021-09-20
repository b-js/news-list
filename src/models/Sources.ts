// import RssFrame from 'src/models/RssFrame';
//
// export default class MosRuRss extends RssFrame {
//   // constructor(data: MosRuRss) {
//   //   super(data);
//   // }
//   url = 'https://www.mos.ru/rss';
//   init()
// }
export interface ISource {
  url: string,
  label: string,
}
