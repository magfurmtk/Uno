import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

export default function ConnectWallet({ onConnect }) {
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => window.location.reload());
    }
  }, []);

  async function connectWallet() {
    const providerOptions = {};
    const web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
    });

    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();

    setAddress(addr);
    onConnect(provider, signer, addr);
  }

  return (
    <div className="flex justify-end mb-4">
      {address ? (
        <div className="text-sm font-mono text-green-600">{address}</div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
