import { useState } from 'react';
import { IGiftPack } from './types/giftPack';
import GiftPackDetail from './components/GiftPackDetail';
import RedeemCodeInput from './components/RedeemCodeInput/ index';
import './App.css';

function App() {
  const [giftPack, setGiftPack] = useState<IGiftPack>();

  return (
    <div className="page">
      <h2>游戏礼包兑换</h2>
      <RedeemCodeInput onUpdate={setGiftPack} />
      {giftPack ? <GiftPackDetail /> : null}
    </div>
  );
}

export default App;
