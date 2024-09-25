import { ethers } from 'ethers';
import { JsonRpcProvider } from 'ethers';

const contractABI = [{"inputs":[],"name":"decrementCount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"incrementCount","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const provider = new JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/UoNUh_8CYZmrKOlwAbyN8Uqko2WmGKs_");

async function main() {
  const counterContract = new ethers.Contract(
    '0x4e6C16dC5e643FA5D321e6AcE2FCea25f07238Ae',
    contractABI,
    provider
  );
  const count = await counterContract.getCount();
  console.log(count)
}

main();