import hashlib
import time
from decimal import Decimal, getcontext

class Block {
    constructor(index, timestamp, data, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.hashBlock();
    }

    hashBlock() {
        const sha = crypto.createHash('sha256');
        sha.update(`${this.index}${this.timestamp}${this.data}${this.previousHash}`);
        return sha.digest('hex');
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
    getcontext().prec = precision + 10;
    const pi = Array.from({ length: precision }, (_, k) => bbpTerm(k))
        .reduce((acc, term) => acc.plus(term), new Decimal(0));
    return [pi.toString(), pi];
}

function hashSegment(segment) {
    const sha = crypto.createHash('sha256');
    sha.update(segment);
    return sha.digest('hex');
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