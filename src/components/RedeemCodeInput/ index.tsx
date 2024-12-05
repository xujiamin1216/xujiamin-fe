import './index.css';

const RedeemCodeInput = () => {
  return (
    <div className="redeem_code_input_wrap">
      <h3 className="redeem_code_tip">
        请输入16位数字和字母（不区分大小写）组成礼品兑换码
      </h3>
      <div>
        <input></input>
      </div>
    </div>
  );
};

export default RedeemCodeInput;
