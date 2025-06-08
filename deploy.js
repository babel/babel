const hre = require("hardhat");

async function main() {
  console.log("Deploying BTCETFToken contract...");

  // Get the contract factory
  const BTCETFToken = await hre.ethers.getContractFactory("BTCETFToken");
  
  // Deploy the contract
  const btcetfToken = await BTCETFToken.deploy();
  
  // Wait for deployment to complete
  await btcetfToken.waitForDeployment();
  
  // Get the contract address
  const contractAddress = await btcetfToken.getAddress();
  
  console.log("BTCETFToken deployed to:", contractAddress);
  console.log("Owner address:", (await hre.ethers.getSigners())[0].address);
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });