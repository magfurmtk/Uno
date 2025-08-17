import { useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import Dashboard from "./components/Dashboard";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState("");

  const onConnect = (prov, sig, addr) => {
    setProvider(prov);
    setSigner(sig);
    setAddress(addr);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <ConnectWallet onConnect={onConnect} />
      {address && signer && (
        <Dashboard provider={provider} signer={signer} address={address} />
      )}
    </div>
  );
}

export default App;
