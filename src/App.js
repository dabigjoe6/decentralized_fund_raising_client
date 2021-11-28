import { useContext } from 'react';
import {WalletContext} from './contexts/Wallet';
const App = () => {

  const {connectWallet, address} = useContext(WalletContext);

  return (
    <div>
      <h1>Funds balance: 10000 ETH</h1>
      <button onClick={connectWallet}>{address ? address : 'Connect wallet'}</button>
      <input type="number" />
      <button>Stake</button>
    </div>
  )
};

export default App;
