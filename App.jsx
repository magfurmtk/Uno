import React, { useState } from "react";
import Layout from "./components/Layout";
import ConnectWallet from "./components/ConnectWallet";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);

  return (
    <Layout>
      {!address ? (
        <ConnectWallet
          onConnect={({ provider, signer, address }) => {
            setProvider(provider);
            setSigner(signer);
            setAddress(address);
          }}
        />
      ) : (
        <Dashboard provider={provider} signer={signer} address={address} />
      )}
    </Layout>
  );
}
