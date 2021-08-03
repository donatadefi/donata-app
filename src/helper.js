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
  //symbol
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    type: 'function',
  },
];

export const getBalance = async (walletAddress, tokenAddress) => {
  let contract = new Web3.eth.Contract(minABI, tokenAddress);

  const balance = await contract.methods.balanceOf(walletAddress).call();
  const decimals = await contract.methods.decimals().call();
  if (balance == 0) {
    return '0';
  }

  const decimalsLength = balance.length - Number(decimals);
  const balanceTrimmed = balance.slice(0, decimalsLength + 2).split('');
  balanceTrimmed.splice(balanceTrimmed.length - 2, 0, '.');
  const r = [...balanceTrimmed].join('');

  return r;
};

export const getTokenName = async (tokenAddress) => {
  try {
    let contract = new Web3.eth.Contract(minABI, tokenAddress);
    const name = await contract.methods.name().call();
    const decimals = await contract.methods.decimals().call();
    const symbol = await contract.methods.symbol().call();
    return {
      name,
      decimals,
      symbol,
    };
  } catch (err) {
    return {
      status: 'error',
    };
  }
};

export const addressTrim = (str) => {
  const trimmedStr = str.slice(0, 6) + '...' + str.slice(38);
  return trimmedStr;
};

export const getEthPrice = () => {
  return fetch('https://donatedefi.finance/eth_price');
};

export const deviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  } else if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return 'mobile';
  }
  return 'desktop';
};
