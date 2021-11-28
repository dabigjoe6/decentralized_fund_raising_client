import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";

export const WalletContext = createContext();

const { Provider } = WalletContext;

const WalletProvider = ({ children }) => {
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const connectWallet = () => {
    window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    setProvider(provider);
    setSigner(signer);
  };

  useEffect(() => {
    if (signer) {
      console.log("signer", signer);
      const getBalance = async () => {
        try {
          const balance = await signer?.getBalance();
          setBalance(balance);
        } catch (e) {
          console.error("Can't get balance", e);
        }
      };

      const getAddress = async () => {
        try {
          const address = await signer?.getAddress();
          setAddress(address);
        } catch (e) {
          console.error("Can't get address", e);
        }
      };

      getBalance();
      getAddress();
    }
  }, [signer]);

  useEffect(() => {
    console.log("address", address);
  }, [address]);

  return (
    <Provider value={{ address, balance, signer, provider, connectWallet }}>
      {children}
    </Provider>
  );
};

export default WalletProvider;
