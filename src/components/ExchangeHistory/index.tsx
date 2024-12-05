import { FC, useCallback } from 'react';
import { IExchangeHistotyItem } from '../../types/exchangeHistory';
import './index.css';

const ExchangeHistory: FC<{
  list: IExchangeHistotyItem[];
  onAward: (index: number) => void;
}> = ({ list, onAward }) => {
  const onAwardClick = useCallback(
    (index: number) => {
      // @no-restricted-globals
      if (window.confirm('领取后不能撤销，是否确认领取？')) {
        onAward(index);
        alert('领取成功');
      }
    },
    [onAward]
  );
  return (
    <div className="history_wrap">
      <h3>兑换记录</h3>
      <ul className="history_list">
        {list.map((item, i) => (
          <li className="history_item">
            <div className="history_info">
              <h4 className="history_name">{item.name}</h4>
              <div>兑换码：{item.code}</div>
              <div>兑换时间：{item.exchangeTime}</div>
            </div>
            <div className="history_status">
              <div>{item.status}</div>
              {item.status === '未领取' ? (
                <button onClick={() => onAwardClick(i)}>立即领取</button>
              ) : null}
            </div>
            <p></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExchangeHistory;
