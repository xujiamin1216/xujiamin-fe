export interface IGiftItem {
  name: string;
  imgUrl: string;
  count: number;
}

export interface IGiftPack {
  name: string;
  descr: string;
  expirationDate: number;
  giftList: IGiftItem[];
}
