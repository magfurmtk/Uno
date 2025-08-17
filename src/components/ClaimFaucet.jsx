import React from "react";

export default function ClaimFaucet({ contract, address }) {
  const claim = async () => {
    try {
      const tx = await contract.claimFaucet();
      await tx.wait();
      alert("Faucet claimed!");
    } catch (err) {
      alert("Claim failed: " + err.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-semibold mb-2">Claim Faucet</h3>
      <button
        onClick={claim}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Claim 1x Faucet
      </button>
    </div>
  );
}
