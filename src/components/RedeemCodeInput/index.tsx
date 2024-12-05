import {
  ChangeEvent,
  ClipboardEvent,
  FC,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import './index.css';
import { IGiftPack } from '../../types/giftPack';
import { readHistory } from '../../utils/history';

const RedeemCodeInput: FC<{
  onExchange: (data: IGiftPack) => void;
}> = ({ onExchange }) => {
  const [codes, setCodes] = useState<string[]>(
    Array.from({ length: 16 }, () => '8')
  );
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, index: number) => {
      const currentValue = event.target.value.match(/^[\dA-Za-z]$/)
        ? event.target.value.toUpperCase() // 小写字母转化成大些
        : '';

      // 如果输入有效值, 则自动聚焦到下一个输入框
      if (currentValue) {
        inputsRef.current[index + 1]?.focus();
      }

      setCodes((oldValue) =>
        oldValue.map((item, i) => (index === i ? currentValue : item))
      );
    },
    []
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>, index: number) => {
      const { key } = event;

      // 是不是回车键
      if (key !== 'Backspace') {
        return;
      }

      if (codes[index]) {
        setCodes((oldValue) =>
          oldValue.map((item, i) => (index === i ? '' : item))
        );
      } else if (index > 0) {
        setCodes((oldValue) =>
          oldValue.map((item, i) => (index - 1 === i ? '' : item))
        );
        inputsRef.current[index - 1]?.focus();
      }
    },
    [codes]
  );
  const onPaste = useCallback((event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault(); // 粘贴会出 p 字母
    let value = event.clipboardData.getData('Text');
    value = value.replace(/[^\dA-Za-z]/g, ''); // 删除不合法的数据

    // @TODO: 整体从开始复制，后续可以优化
    setCodes((oldValue) =>
      Array.from(
        { length: oldValue.length },
        (_, index) => value.substring(index, index + 1).toUpperCase() || ''
      )
    );

    const focusIndex = Math.min(value.length, inputsRef.current.length - 1);
    inputsRef.current[focusIndex]?.focus();
  }, []);

  const exchange = useCallback(() => {
    if (codes.some((item) => item === '')) {
      alert('请输入完整的礼品兑换码');
      return;
    }
    const value = codes.join('');
    if (value.substring(0, 4) === '8888') {
      const historyList = readHistory();
      const item = historyList.find((item) => item.code === value);
      if (item && item.status === '已领取') {
        alert('礼品兑换码已被领取');
        return;
      }
      // 有效的
      onExchange({
        code: value,
        id: '1234',
        name: '惊喜大礼包',
        description: '一等奖',
        expireTime: '2025-01-31',
        items: [
          {
            id: '123',
            name: '角色',
            icon: 'imgs/yufu.jpg',
            amount: 1,
          },
          {
            id: '123',
            name: '武器',
            icon: 'imgs/yufu.jpg',
            amount: 1,
          },
        ],
      });
      // 清空
      setCodes((oldValue) => oldValue.map(() => ''));
    } else if (value.substring(0, 4) === '9999') {
      // 无效的
      alert('礼品兑换码无效，请检查是否输入正确');
    } else {
      alert('礼品兑换码已被领取');
    }
  }, [codes, onExchange]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  return (
    <div className="redeem_code_input_wrap">
      <h3 className="redeem_code_tip">
        请输入16位数字和字母（不区分大小写）组成礼品兑换码
      </h3>
      <div className="redeem_code_input">
        {codes.map((code, index) => (
          <input
            key={index}
            ref={(ele) => (inputsRef.current[index] = ele)}
            className="redeem_code_item"
            maxLength={1}
            value={code}
            onChange={(e) => onChange(e, index)}
            onKeyDown={(e) => onKeyDown(e, index)}
            onPaste={onPaste}
          />
        ))}
      </div>
      <button className="exchange_redeem_code" onClick={exchange}>
        兑换
      </button>
    </div>
  );
};

export default memo(RedeemCodeInput);
