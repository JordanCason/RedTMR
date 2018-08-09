
export let BountyFactoryAddress;
export let BountyFactoryAbi;
BountyFactoryAddress = "0xE50931D71eeC7fc6c612Ba78d1126aB2B9F9FAA2"
BountyFactoryAbi = [ { constant: false,
    inputs: [ { name: 'ipfs', type: 'string' } ],
    name: 'createBounty',
    outputs: [ { name: '', type: 'address' } ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
    signature: '0x06868c4b' },
  { constant: true,
    inputs: [ { name: '', type: 'uint256' } ],
    name: 'bountyArray',
    outputs: [ { name: '', type: 'address' } ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x46ab45c0' },
  { constant: true,
    inputs: [],
    name: 'getvalue',
    outputs: [ { name: '', type: 'uint256' } ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x69bd01c4' },
  { constant: true,
    inputs: [],
    name: 'owner',
    outputs: [ { name: '', type: 'address' } ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x8da5cb5b' },
  { constant: true,
    inputs: [],
    name: 'getContractCount',
    outputs: [ { name: 'contractCount', type: 'uint256' } ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x9399869d' },
  { inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
    signature: 'constructor' },
  { anonymous: false,
    inputs: [ { indexed: false, name: '', type: 'address' } ],
    name: 'returnBounty',
    type: 'event',
    signature:
     '0x8054e2cb87f5198e83eb21b311baa03e75b155b365725dc25a38b77677ccdabf' } ]
    