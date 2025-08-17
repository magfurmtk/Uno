import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  UNION_ADDRESS,
  UNION_ABI,
  UNIONPOOL_ADDRESS,
  UNIONPOOL_ABI,
} from "../utils";

import ClaimFaucet from "./ClaimFaucet";
import UnionForm from "./UnionForm";
import ClaimReward from "./ClaimReward";
import History from "./History";
import RewardChart from "./RewardChart";

export default function Dashboard({ provider, signer, address }) {
  const [unionContract, setUnionContract] = useState(null);
  const [unionPool, setUnionPool] = useState(null);
  const [balance, setBalance] = useState("0");
  const [merged, setMerged] = useState("0");
  const [claimable, setClaimable] = useState("0");
  const [apy, setApy] = useState(0);

  useEffect(() => {
    const union = new ethers.Contract(UNION_ADDRESS, UNION_ABI, signer);
    const pool = new ethers.Contract(UNIONPOOL_ADDRESS, UNIONPOOL_ABI, provider);
    setUnionContract(union);
    setUnionPool(pool);
  }, [signer]);

  useEffect(() => {
    if (unionContract && address) {
      updateInfo();
    }

    async function updateInfo() {
      const b = await unionContract.balanceOf(address);
      const m = await unionContract.totalMerged();
      const c = await unionContract.claimable(address);
      const a = await unionContract.apy();
      setBalance(ethers.utils.formatUnits(b, 6));
      setMerged(ethers.utils.formatUnits(m, 6));
      setClaimable(ethers.utils.formatUnits(c, 6));
      setApy(a / 100); // from basis points
    }
  }, [unionContract]);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Dashboard</h2>
        <p><strong>Wallet:</strong> {address}</p>
        <p><strong>Balance:</strong> {balance} UNO</p>
        <p><strong>Claimable:</strong> {claimable} UNO</p>
        <p><strong>TVL:</strong> {merged} UNO</p>
        <p><strong>APY:</strong> {apy.toFixed(2)}%</p>
      </div>

      <ClaimFaucet contract={unionContract} address={address} />
      <UnionForm contract={unionContract} address={address} signer={signer} />
      <ClaimReward contract={unionContract} address={address} />
      <RewardChart address={address} />
      <History />
    </div>
  );
}
