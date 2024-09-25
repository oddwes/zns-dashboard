import { JsonRpcProvider } from 'ethers';

const contractAddress = '0x59B9Ac688e39A14b938AC8C3269db66D8aDB9aF6';
const provider = new JsonRpcProvider("https://blast-mainnet.g.alchemy.com/v2/UoNUh_8CYZmrKOlwAbyN8Uqko2WmGKs_");

async function main() {
  try {
    const transactionCount = await provider.getTransactionCount(contractAddress);
    console.log(`Transaction count: ${transactionCount}`);
    } catch (error) {
        console.error(error);
  }
}

main();