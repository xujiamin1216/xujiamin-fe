import {
  ChangeEvent,
  ClipboardEvent,
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import './index.css';
import { IGiftPack } from '../../types/giftPack';

const RedeemCodeInput: FC<{ onUpdate: (data: IGiftPack) => void }> = ({
  onUpdate,
}) => {
  const [codes, setCodes] = useState<string[]>(
    Array.from({ length: 16 }, () => '')
  );
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, index: number) => {
      debugger;
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

  const verify = useCallback(() => {
    if (codes.some((item) => item === '')) {
      alert('请输入完整的礼品兑换码');
      return;
    }
    const value = codes.join('');
    if (value === '8888888888888888') {
      // 有效的
      onUpdate({
        name: '惊喜大礼包',
        descr: '一等奖',
        expirationDate: new Date(2025, 1, 31).getTime(),
        giftList: [
          {
            name: '机械键盘',
            imgUrl: 'imgs/yufu.jpg',
            count: 1,
          },
        ],
      });
    } else if (value === '8888888888888889') {
      // 已经使用
      alert('礼品兑换码已使用');
    } else {
      // 无效的
      alert('礼品兑换码无效，请检查是否输入正确');
    }
  }, [codes]);

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
      <button className="verify_redeem_code" onClick={verify}>
        验证
      </button>
    </div>
  );
};

export default RedeemCodeInput;
