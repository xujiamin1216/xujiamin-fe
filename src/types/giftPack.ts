export interface IGiftItem {
  imgUrl: string;
  name: string;
  count: number;
}

export interface IGiftPack {
  name: string;
  descr: string;
  expirationDate: number;
  giftList: IGiftItem[];
}
