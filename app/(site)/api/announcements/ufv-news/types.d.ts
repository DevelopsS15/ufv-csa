export interface Root {
  "?xml": Xml;
  rss: Rss;
}

export interface Xml {
  "@_version": string;
  "@_encoding": string;
}

export interface Rss {
  channel: Channel;
  "@_version": string;
  "@_xmlns:content": string;
  "@_xmlns:wfw": string;
  "@_xmlns:dc": string;
  "@_xmlns:atom": string;
  "@_xmlns:sy": string;
  "@_xmlns:slash": string;
}

export interface Channel {
  title: string;
  "atom:link": AtomLink;
  link: string;
  description: string;
  lastBuildDate: string;
  language: string;
  "sy:updatePeriod": string;
  "sy:updateFrequency": number;
  item: Item[];
}

export interface AtomLink {
  "@_href": string;
  "@_rel": string;
  "@_type": string;
}

export interface Item {
  title: string;
  link: string;
  "dc:creator": string;
  pubDate: string;
  category: string;
  guid: Guid;
  description: string;
  "content:encoded": string;
}

export interface Guid {
  "#text": string;
  "@_isPermaLink": string;
}
