import web3 from 'web3';
const Web3 = new web3(
  new web3.providers.HttpProvider(
    'https://mainnet.infura.io/v3/5d77daec222d4ad994408839514891ee'
  )
);

// The minimum ABI to get ERC20 Token details
let minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  // decimals
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function',
  },
  //name
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

export const getBalance = async (walletAddress, tokenAddress) => {
  let contract = new Web3.eth.Contract(minABI, tokenAddress);

  const balance = await contract.methods.balanceOf(walletAddress).call();

  return balance;
};

export const getTokenName = async (tokenAddress) => {
  try {
    let contract = new Web3.eth.Contract(minABI, tokenAddress);
    const name = await contract.methods.name().call();
    return name;
  } catch (err) {
    return {
      status: 'error',
    };
  }
};
