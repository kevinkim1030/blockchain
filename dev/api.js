const express = require('express');
const app = express();
const Blockchain = require('./blockchain');
const { v4: uuidv4 } = require('uuid');

const nodeAddress = uuidv4().split('-').join('');

const firecoin = new Blockchain();

app.use(express.urlencoded({ extended: true}))
app.use(express.json());

app.get('/blockchain', function (req, res) {
  res.send(firecoin);
});

app.post('/transaction', function (req, res) {
  const blockIndex = firecoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
  res.json({ note: `Transaction will be added in block ${blockIndex}`})
});

app.get('/mine', function (req, res) {
  const lastBlock = firecoin.getLastBlock;
  const previousBlockHash = lastBlock['hash'];
  const currentBlockData = {
    transactions: firecoin.pendingTransactions,
    index: lastBlock['index'] + 1
  }
  const nonce = firecoin.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = firecoin.hashBlock(previousBlockHash, currentBlockData, nonce);

  // mining reward
  firecoin.createNewTransaction(6.25, "00", nodeAddress);

  const newBlock = firecoin.createNewBlock(nonce, previousBlockHash, blockHash);
  res.json({
    note: "New block mined succesfully",
    block: newBlock
  })
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});