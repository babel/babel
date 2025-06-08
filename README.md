# BTCETFToken Deployment

This project contains the smart contract for BTCETFToken and the deployment scripts.

## Contract Information

- **Contract Address**: 0x37d762A9c38EAe595bEbcF0Ada2DF93aB83ff8ac
- **Owner Wallet**: 0x8846f867AAd372528BFbf26290BE6eF01b759DE2
- **IPFS Hash**: ipfs://eb23651c04d6495dddb8404b62acdd19081883bcb187558caa4e138fcbc1f6f2

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Configure your private key:
   - Edit the `.env` file and add your private key (without the 0x prefix)

3. Compile the contract:
   ```
   npm run compile
   ```

4. Deploy the contract:
   ```
   npm run deploy
   ```

## Contract Verification

After deployment, you can verify the contract on BscScan using:

```
npx hardhat verify --network bsc DEPLOYED_CONTRACT_ADDRESS
```

Replace `DEPLOYED_CONTRACT_ADDRESS` with the address where your contract was deployed.

## Contract Features

- BEP-20 compatible token
- Name: BTCETFToken
- Symbol: BTCETF
- Decimals: 18
- Total Supply: 2,100,000,000 tokens
- Custom deposit system with time-based vesting
- Owner-controlled liquidity management