class Block {
    constructor(index, timestamp, data, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.hashBlock();
    }

    hashBlock() {
        const sha = sha256.create();
        sha.update(`${this.index}${this.timestamp}${this.data}${this.previousHash}`);
        return sha.hex();
    }
}

function bbpTerm(k) {
    k = new Decimal(k);
    const term = new Decimal(1).div(Decimal.pow(16, k)).times(
        new Decimal(4).div(8 * k + 1)
        .minus(new Decimal(2).div(8 * k + 4))
        .minus(new Decimal(1).div(8 * k + 5))
        .minus(new Decimal(1).div(8 * k + 6))
    );
    return term;
}

function calculatePiBbp(precision) {
    Decimal.set({ precision: precision + 10 });  // Extra precision to handle rounding errors
    const pi = Array.from({ length: precision }, (_, k) => bbpTerm(k))
        .reduce((acc, term) => acc.plus(term), new Decimal(0));
    return [pi.toString(), pi];
}

function hashSegment(segment) {
    const sha = sha256.create();
    sha.update(segment);
    return sha.hex();
}

function createGenesisBlock() {
    return new Block(0, Date.now(), "Genesis Block", "0");
}

function nextBlock(lastBlock, piSegment, piHash) {
    const thisIndex = lastBlock.index + 1;
    const thisTimestamp = Date.now();
    const thisData = {
        segment: piSegment,
        hash: piHash,
    };
    const thisHash = lastBlock.hash;
    return new Block(thisIndex, thisTimestamp, thisData, thisHash);
}

function displayPiValue(piApprox, precision) {
    const truncatedPi = piApprox.toString().substring(0, 10);
    console.log(`Approximate value of pi: ${truncatedPi}... with ${precision} decimal places`);
}

async function connectMetaMask() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
            document.getElementById('accountAddress').innerText = `Connected account: ${account}`;
            console.log(`Connected account: ${account}`);
            document.getElementById('startMining').disabled = false; // Enable mining button
        } catch (error) {
            console.error('User denied account access', error);
        }
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
}

document.getElementById('connectMetamask').addEventListener('click', connectMetaMask);

document.getElementById('startMining').addEventListener('click', () => {
    const initialPrecision = 5;
    const incrementFactor = 2;
    const updateInterval = 10000;  // 10 seconds

    const blockchain = [createGenesisBlock()];
    let previousBlock = blockchain[0];

    let precision = initialPrecision;
    let startTime = Date.now();

    (function minePi() {
        const [piSegment, piApprox] = calculatePiBbp(precision);
        const piHash = hashSegment(piSegment);

        const blockToAdd = nextBlock(previousBlock, piSegment, piHash);
        blockchain.push(blockToAdd);
        previousBlock = blockToAdd;

        console.log(`Block #${blockToAdd.index} has been added to the blockchain!`);
        console.log(`Segment: ${piSegment.substring(0, 50)}...`);
        console.log(`Hash: ${blockToAdd.hash}`);

        precision *= incrementFactor;

        if (Date.now() - startTime >= updateInterval) {
            displayPiValue(piApprox, precision);
            startTime = Date.now();
        }

        document.getElementById('miningStatus').innerText = `Last Block: #${blockToAdd.index}`;

        setTimeout(minePi, 1000);
    })();
});