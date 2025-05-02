import { createContext, useContext, useEffect, useState } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    const checkConnection = async () => {
      //check if a wallet is already connected
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        setWalletAddress(accounts[0] || null);
      }
    };

    checkConnection();

    //listen for account changes
    window.ethereum?.on("accountsChanged", (accounts) => {
      setWalletAddress(accounts[0] || null);
    });

    return () => {
      window.ethereum?.removeAllListeners("accountsChanged");
    };
  }, []);

  return (
    <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
      {children}
    </WalletContext.Provider>
  );
};
//to access wallet info in other components
export const useWallet = () => useContext(WalletContext);
