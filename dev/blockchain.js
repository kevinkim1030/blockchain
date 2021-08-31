const sha256 = require('sha256');

function Blockchain() {
  this.chain = [];
  this.pendingTransactions = [];

  // genesis block
  this.createNewBlock(100, '0', '0');
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
  const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    transactions: this.pendingTransactions,
      // the new transactions waiting to be in the block
    nonce: nonce,
      // proof of work(a number) that the new block was created legitimately
    hash: hash,
      // data from new block
    previousBlockHash: previousBlockHash
  };

  this.pendingTransactions = [];
  this.chain.push(newBlock);

  return newBlock;
}

Blockchain.prototype.getLastBlock = function() {
  return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function(amount, sender,recipient) {
  const newTransaction = {
    amount: amount,
    sender: sender,
    recipient: recipient
  };

  this.pendingTransactions.push(newTransaction);

  return this.getLastBlock()['index'] + 1;
}

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
  const dataToString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
  const hash = sha256(dataToString);
  return hash;
}

Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData) {
  let nonce = 0;
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  while (hash.substring(0,4) !== '0000') {
    nonce++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    console.log(hash);
  }
   return nonce;
}




module.exports = Blockchain;