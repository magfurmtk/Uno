import React from "react";

export default function ClaimReward({ contract }) {
  const handleClaim = async () => {
    try {
      const tx = await contract.claimReward();
      await tx.wait();
      alert("Reward claimed!");
    } catch (e) {
      alert("Claim failed: " + e.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-semibold mb-2">Claim Daily Reward</h3>
      <button
        onClick={handleClaim}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Claim Reward
      </button>
    </div>
  );
}
