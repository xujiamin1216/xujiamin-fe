import { useCallback, useState } from 'react';
import { IGiftPack } from './types/giftPack';
import GiftPackDetail from './components/GiftPackDetail';
import RedeemCodeInput from './components/RedeemCodeInput';
import './App.css';
import { readHistory, writeHistory } from './utils/history';
import { IExchangeHistotyItem } from './types/exchangeHistory';
import dayjs from 'dayjs';
import ExchangeHistory from './components/ExchangeHistory';

function App() {
  const [giftPack, setGiftPack] = useState<IGiftPack>();
  const [historyList, setHistoryList] = useState<IExchangeHistotyItem[]>(
    readHistory()
  );

  const onExchange = useCallback(
    (data: IGiftPack) => {
      setGiftPack(data);
      const index = historyList.findIndex((item) => item.code === data.code);
      const result: IExchangeHistotyItem[] = [
        {
          code: data.code,
          name: data.name,
          exchangeTime: dayjs().format('YYYY-MM-DD HH:mm'),
          status: '未领取',
        },
        ...historyList,
      ];
      if (index !== -1) {
        result.splice(index + 1, 1);
      }
      if (result.length > 5) {
        result.splice(5, result.length - 5);
      }
      setHistoryList(result);
      writeHistory(result);
    },
    [historyList]
  );

  const clearGiftPack = useCallback(() => {
    setGiftPack(undefined);
  }, []);

  const onAward = useCallback(
    (detail: IGiftPack) => {
      setGiftPack(undefined);
      const index = historyList.findIndex((item) => item.code === detail.code);
      if (index !== -1) {
        const result = historyList.map((item, i) =>
          i === index ? { ...item, status: '已领取' } : item
        );
        setHistoryList(result);
        writeHistory(result);
      }
    },
    [historyList]
  );

  return (
    <div className="page">
      <h2>游戏礼包兑换</h2>
      <RedeemCodeInput onExchange={onExchange} />
      {giftPack ? (
        <GiftPackDetail
          detail={giftPack}
          onGiveup={clearGiftPack}
          onAward={onAward}
        />
      ) : null}
      {historyList.length > 0 ? <ExchangeHistory list={historyList} /> : null}
    </div>
  );
}

export default App;
