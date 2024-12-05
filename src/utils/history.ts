import { IExchangeHistotyItem } from '../types/exchangeHistory';

const historyName = 'exchange_history';

export function readHistory(): IExchangeHistotyItem[] {
  try {
    const value = localStorage.getItem(historyName);
    if (!value) return [];
    return JSON.parse(value); // @TODO: 数据格式没有做严格校验
  } catch (_) {
    return [];
  }
}

export function writeHistory(data: IExchangeHistotyItem[]) {
  try {
    localStorage.setItem(historyName, JSON.stringify(data));
  } catch (_) {}
}
