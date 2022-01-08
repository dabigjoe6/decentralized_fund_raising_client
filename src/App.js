import { useContext, useState } from "react";
import Web3 from "web3";
import { ContractContext } from "./contexts/Contract";
import useCountdown from "./hooks/useCountdown";
const App = () => {
  const {
    connectWallet,
    address,
    walletBalance,
    stakerBalance,
    stake,
    highestBidder,
    highestBidderAmount,
    deadline
  } = useContext(ContractContext);

  const [amount, setAmount] = useState(0);

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const countdown = useCountdown(deadline);

  return (
    <div>
      <h1>Countdown: {countdown}</h1>
      <h1>Funds balance: {Web3.utils.fromWei(stakerBalance)} ETH</h1>
      <h3>Wallet balance: {Web3.utils.fromWei(walletBalance)} ETH</h3>
      <h4>Highest Bidder: {highestBidder}</h4>
      <h4>Highest Bidder Amount: {highestBidderAmount} ETH</h4>
      <button onClick={connectWallet}>
        {address ? address : "Connect wallet"}
      </button>
      <input type="number" value={amount} onChange={handleAmount} />
      <button onClick={() => stake(amount)}>Stake</button>
    </div>
  );
};

export default App;
