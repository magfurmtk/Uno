import React, { useState } from "react";
import { ethers } from "ethers";
import { UNION_ADDRESS } from "../utils";

export default function UnionForm({ contract, signer }) {
  const [amount, setAmount] = useState("");
  const [referrer, setReferrer] = useState("");

  const handleUnion = async () => {
    const tokenWithSigner = contract.connect(signer);
    const val = ethers.utils.parseUnits(amount, 6);

    try {
      const allowance = await contract.allowance(await signer.getAddress(), UNION_ADDRESS);
      if (allowance.lt(val)) {
        const approveTx = await contract.approve(UNION_ADDRESS, ethers.constants.MaxUint256);
        await approveTx.wait();
      }

      const tx = await tokenWithSigner.union(val, referrer);
      await tx.wait();
      alert("Union (deposit) successful!");
    } catch (e) {
      alert("Union failed: " + e.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-semibold mb-2">Union (Deposit)</h3>
      <input
        type="text"
        placeholder="Amount UNO"
        className="border px-2 py-1 rounded mr-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Referrer (optional)"
        className="border px-2 py-1 rounded mr-2"
        value={referrer}
        onChange={(e) => setReferrer(e.target.value)}
      />
      <button
        onClick={handleUnion}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Union
      </button>
    </div>
  );
}
