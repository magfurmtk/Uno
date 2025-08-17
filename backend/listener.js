import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";
import ABI from "./abis/Union.json" assert { type: "json" };

dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const contract = new ethers.Contract(process.env.UNION_ADDRESS, ABI.abi, provider);

const historyFile = "./history.json";
const rewardFile = "./reward.json";

const logEvent = (type, user, amount) => {
  const now = Math.floor(Date.now() / 1000);
  const data = { type, user, amount: ethers.utils.formatUnits(amount, 6), time: now };

  const history = JSON.parse(fs.readFileSync(historyFile, "utf8"));
  history.unshift(data);
  fs.writeFileSync(historyFile, JSON.stringify(history.slice(0, 100), null, 2));

  if (type === "ClaimReward") {
    const reward = JSON.parse(fs.readFileSync(rewardFile, "utf8"));
    reward.push(data);
    fs.writeFileSync(rewardFile, JSON.stringify(reward.slice(-100), null, 2));
  }
};

contract.on("ClaimReward", (user, amount) => {
  logEvent("ClaimReward", user, amount);
});

contract.on("ClaimFaucet", (user, amount) => {
  logEvent("ClaimFaucet", user, amount);
});

console.log("⏳ Listening to Union contract events...");
