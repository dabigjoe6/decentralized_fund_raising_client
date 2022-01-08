import { createContext, useState, useEffect } from "react";
import StakerContract from "../Staker.json";
import Web3 from "web3";

export const ContractContext = createContext();

const { Provider } = ContractContext;

// const STAKER_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const STAKER_ADDRESS = '0xAdFaCfa0a26EFB1B31FCd608aF5105574F0b6CDe';

const ContractProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [stakerBalance, setStakerBalance] = useState("");
  const [highestBidder, setHighestBidder] = useState("");
  const [highestBidderAmount, setHighestBidderAmount] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [deadline, setDeadline] = useState(0);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.send("eth_requestAccounts");

        setProvider(web3.eth);
      } else {
        window.open("https://metamask.io/download.html", "_newtab");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const stake = (amount) => {
    if (provider && contract && address && amount > 0) {

      provider.sendTransaction({
        from: address,
        to: STAKER_ADDRESS,
        value: Web3.utils.toWei(amount),
        data: contract.methods.stake().encodeABI(),
        gasPrice: "20000000000",
        gas: "210640",
      });
    }
  };


  const getHighestBidder = (_address) => {
    if (contract && address && provider) {
      contract.methods.getHighestBidder().call().then(result => {
        setHighestBidder(result[0]);
        setHighestBidderAmount(Web3.utils.fromWei(result[1]));
      });
    }
  };

  const getBalance = (_address, setBalance) => {
    if (_address) {
      provider.getBalance(_address).then((_balance) => {
        setBalance(_balance);
      });
    }
  }

  const getStakerBalance = () => {
   getBalance(STAKER_ADDRESS, setStakerBalance);
  }

  const getWalletBalance = () => {
    getBalance(address, setWalletBalance);
  }

  useEffect(() => {
    if (provider) {
      const _contract = new provider.Contract(StakerContract.abi,
        STAKER_ADDRESS
      );

      setContract(_contract);
    }

    if (provider && !address) {
      provider.getAccounts().then((accounts) => {
        setAddress(accounts[0]);
      });
    }

    if (provider && !stakerBalance) {
     getStakerBalance();
    }
  }, [provider]);

  useEffect(() => {
    if (address && !walletBalance) {
     getWalletBalance();
    }
  }, [address]);

  useEffect(() => {
    if (contract && address) {
      contract.events.StakeSuccess().on('data', (event) => {
        getHighestBidder();
        getWalletBalance();
        getStakerBalance();
      })
    }
  }, [contract, address]);

  useEffect(() => {
    if (contract && !deadline) {
      contract.methods.getDeadline().call().then(result => {
        setDeadline(result)
      })
    }
  }, [contract]);

  return (
    <Provider
      value={{
        address,
        stakerBalance,
        walletBalance,
        connectWallet,
        provider,
        highestBidder,
        highestBidderAmount,
        stake,
        deadline
      }}
    >
      {children}
    </Provider>
  );
};

export default ContractProvider;
