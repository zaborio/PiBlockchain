async function loadBlockchain() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        return;
    }

    const contractAddress = 'YOUR_CONTRACT_ADDRESS';  // Remplacez par l'adresse de votre contrat
    const abi = [
        {
            "inputs": [],
            "name": "getBlockchainLength",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "getBlock",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "index",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "data",
                            "type": "string"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "previousHash",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "hash",
                            "type": "bytes32"
                        }
                    ],
                    "internalType": "struct PiBlockchain.Block",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "data",
                    "type": "string"
                },
                {
                    "internalType": "bytes32",
                    "name": "previousHash",
                    "type": "bytes32"
                }
            ],
            "name": "addBlock",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    const contract = new web3.eth.Contract(abi, contractAddress);
    const accounts = await web3.eth.getAccounts();

    const blockchainLength = await contract.methods.getBlockchainLength().call();
    const blockchainDiv = document.getElementById('blockchain');
    blockchainDiv.innerHTML = '';

    for (let i = 0; i < blockchainLength; i++) {
        const block = await contract.methods.getBlock(i).call();
        const blockElement = document.createElement('div');
        blockElement.innerHTML = `
            <h3>Block ${block.index}</h3>
            <p>Timestamp: ${block.timestamp}</p>
            <p>Data: ${block.data}</p>
            <p>Previous Hash: ${block.previousHash}</p>
            <p>Hash: ${block.hash}</p>
        `;
        blockchainDiv.appendChild(blockElement);
    }
}

async function addBlock() {
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';  // Remplacez par l'adresse de votre contrat
    const abi = [
        {
            "inputs": [],
            "name": "getBlockchainLength",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "getBlock",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "index",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "data",
                            "type": "string"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "previousHash",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "hash",
                            "type": "bytes32"
                        }
                    ],
                    "internalType": "struct PiBlockchain.Block",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "data",
                    "type": "string"
                },
                {
                    "internalType": "bytes32",
                    "name": "previousHash",
                    "type": "bytes32"
                }
            ],
            "name": "addBlock",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    const contract = new web3.eth.Contract(abi, contractAddress);
    const accounts = await web3.eth.getAccounts();
    const blockchainLength = await contract.methods.getBlockchainLength().call();
    const previousBlock = await contract.methods.getBlock(blockchainLength - 1).call();
    const data = 'New Block Data';
    const previousHash