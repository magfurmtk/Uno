const hre = require("hardhat");
require("dotenv").config();

async function main() {
  // Deploy Union token
  const Union = await hre.ethers.getContractFactory("Union");
  const union = await Union.deploy();
  await union.deployed();
  console.log("Union deployed to:", union.address);

  // Deploy UnionPool, pass union address to constructor if needed
  const UnionPool = await hre.ethers.getContractFactory("UnionPool");
  const pool = await UnionPool.deploy(union.address);
  await pool.deployed();
  console.log("UnionPool deployed to:", pool.address);

  // Set pool address in union token if needed
  const tx = await union.setPoolAddress(pool.address);
  await tx.wait();

  console.log("Setup done");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
