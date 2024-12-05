import { FC } from 'react';
import { IExchangeHistotyItem } from '../../types/exchangeHistory';
import './index.css';

const ExchangeHistory: FC<{ list: IExchangeHistotyItem[] }> = ({ list }) => {
  return (
    <div className="history_wrap">
      <h3>兑换记录</h3>
      <ul className="history_list">
        {list.map((item) => (
          <li className="history_item">
            <div className="history_info">
              <h4 className="history_name">{item.name}</h4>
              <div>兑换码：{item.code}</div>
              <div>兑换时间：{item.exchangeTime}</div>
            </div>
            <div className="history_status">
              <div>{item.status}</div>
            </div>
            <p></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExchangeHistory;
