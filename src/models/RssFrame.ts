import { ISource } from 'src/models/Sources';
import moment from 'moment';

interface IRssFrameRawRssChannelItemEnclosure {
  _attributes: {
    length: string
    type: string
    url: string
  }
}
interface IRssFrameRawRssChannelItem {
  author: { _text: string }
  category: { _text: string }
  description: { _cdata: string } | { _text: string }
  enclosure: IRssFrameRawRssChannelItemEnclosure | IRssFrameRawRssChannelItemEnclosure[]
  guid: {_text: string }
  link: { _text: string }
  pubDate: { _text: string }
  title: { _text: string }
}
interface IRssFrameRawRssChannel {
  'atom:link' : {
    _attributes: {
      _href: string;
      rel: string;
      type: string;
    }};
  description: {
    _text: string;
  };
  image: {
    height: { _text: string }
    link: { _text: string }
    title: { _text: string }
    url: { _text: string }
    width: { _text: string }
  };
  item: IRssFrameRawRssChannelItem[];
  language: { _text: string };
  link: { _text: string };
  title: { _text: string };
}
interface IRssFrameRawRss {
  channel: IRssFrameRawRssChannel,
  _attributes: {
    version: string
    'xmlns:atom': string
  },
}
export interface IRssFrameRaw {
  rss: IRssFrameRawRss
  _declaration: {
    _attributes: {
      encoding: string,
    }
  }
}

export class RssFrameItem {
  author: string = '';
  description: string = '';
  enclosure!: IRssFrameRawRssChannelItemEnclosure[]
  guid: string = '';
  link: string = '';
  pubDate: string = '';
  thumbnail: string = '';
  title: string = '';
  source!: string;

  constructor(data: IRssFrameRawRssChannelItem, source: string) {
    this.source = source;
    this.author = data.author ? data.author._text : '';
    // eslint-disable-next-line prefer-destructuring
    this.description = data.description ? Object.values(data.description)[0] : '';
    if (data.enclosure) {
      this.enclosure = Array.isArray(data.enclosure) ? data.enclosure : [data.enclosure];
    } else {
      this.enclosure = [];
    }
    this.link = data.link._text;
    this.guid = data.guid ? data.guid._text : '';
    this.pubDate = data.pubDate._text;
    this.title = data.title._text;
  }
  get date() {
    return moment(this.pubDate).format('DD.MM.YYYY');
  }
  get timestamp() {
    return moment(this.pubDate).valueOf();
  }
}
export abstract class Rss {
  page = 1;
  items_set: Set<RssFrameItem> = new Set();
  get items() {
    return Array.from(this.items_set);
  }
  abstract prevPage():Promise<void>
  abstract nextPage():Promise<void>
}

export default class RssData extends Rss {
  label!: string;
  load!: (url_address: string, page: number) => Promise<IRssFrameRaw>;
  url!: string;
  async prevPage() {
    this.page--;
    const data = await this.load(this.url, this.page);
    data.rss.channel.item.map((item) => this.items_set.add(new RssFrameItem(item, this.label)));
  }
  async nextPage() {
    this.page++;
    const data = await this.load(this.url, this.page);
    data.rss.channel.item.map((item) => this.items_set.add(new RssFrameItem(item, this.label)));
  }
  async init(source: ISource, load: (url_address: string, page: number) => Promise<IRssFrameRaw>) {
    const data = await load(source.url, this.page);
    this.load = load;
    this.label = source.label;
    this.url = source.url;
    data.rss.channel.item.map((item) => this.items_set.add(new RssFrameItem(item, this.label)));
    return this;
  }
}
export class RssDataAll extends Rss {
  label: string = 'all';
  items_set: Set<RssFrameItem>;
  constructor(items: RssFrameItem[]) {
    super();
    this.items_set = new Set([...items]);
  }
  get items() {
    return Array.from(this.items_set).slice().sort((a, b) => b.timestamp - a.timestamp);
  }
  async nextPage(): Promise<void> {
    return Promise.resolve(undefined);
  }
  async prevPage(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
