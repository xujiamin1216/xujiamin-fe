import { FC, useCallback } from 'react';
import { IGiftPack } from '../../types/giftPack';
import './index.css';

const GiftPackDetail: FC<{
  detail: IGiftPack;
  onGiveup: () => void;
  onAward: (detail: IGiftPack) => void;
}> = ({ detail, onGiveup, onAward }) => {
  const onGiveUpClick = useCallback(() => {
    onGiveup();
  }, [onGiveup]);

  const onAwardClick = useCallback(() => {
    // @no-restricted-globals
    if (window.confirm('兑换完成后不能撤销，是否确认兑换？')) {
      onAward(detail);
      alert('领取成功');
    }
  }, [onAward, detail]);
  return (
    <div className="gift_pack_detail">
      <h3 className="gift_pack_name">{detail.name}</h3>
      <p className="gift_pack_descr">{detail.description}</p>
      <ul className="gift_list">
        {detail.items.map((item) => (
          <li className="gift_item">
            <img className="gift_icon" src={item.icon} />
            <div className="gift_info">
              <h4>{item.name}</h4>
              <div>数量：{item.amount}</div>
            </div>
          </li>
        ))}
      </ul>
      <p className="gift_pack_expire_time">过期时间：{detail.expireTime}</p>
      <div className="gift_pack_operation">
        <button className="giveup_gift_pack" onClick={onGiveUpClick}>
          暂不领取
        </button>
        <button className="exchange_gift_pack" onClick={onAwardClick}>
          立即领取
        </button>
      </div>
    </div>
  );
};

export default GiftPackDetail;
