export interface IGiftItem {
  id: string;
  name: string;
  icon: string;
  amount: number;
}

export interface IGiftPack {
  code: string;
  id: string;
  name: string;
  description: string;
  expireTime: string;
  items: IGiftItem[];
}
