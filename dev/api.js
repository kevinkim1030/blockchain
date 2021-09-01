const express = require('express');
const app = express();
const Blockchain = require('./blockchain');

const firecoin = new Blockchain();

app.use(express.urlencoded({ extended: true}))
app.use(express.json());

app.get('/', function (req, res) {
  res.send('HELLO WORLD FROM ROOT VIA EXPRESS')
})

app.get('/blockchain', function (req, res) {
  
});

app.post('/transactions', function (req, res) {
  console.log(req.body);
  res.send(`The amount of the transaction is ${req.body.amount} firecoin`);
});

app.get('/mine', function (req, res) {

});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});