const express = require("express");
const {uuid} = require("uuidv4");
const app = express();
app.use(express.json());

const transactions = [];

app.get("/transactions", (request, response) => {
    const { title, value, type } = request.query; 
    var total = 0;
    var income = 0;
    var outcome = 0;
    
    for (transaction of transactions){
        if(transaction.type.toLowerCase() == "income"){
            total += transaction.value
            income += transaction.value
        }
        else if(transaction.type.toLowerCase() == "outcome"){
            total -= transaction.value
            outcome += transaction.value 
        }
    }
    
    const balance = {income, outcome, total}
    
    return response.json({transactions, balance});
});

app.post('/transactions', (request, response) => {
    const {title, value, type} = request.body;

    const transaction = {id: uuid(),title, value, type};

    transactions.push(transaction);

    return response.json(transaction);
});

app.put("/transactions/:id", (request, response) => {
    const { id } = request.params;
    const { title, value, type } = request.body;
  
    const transactionIndex = transactions.findIndex((transaction) => transaction.id === id);
  
    const transaction = {
      id,
      title,
      value,
      type
    };
  
    transactions[transactionIndex] = transaction;
  
    return response.json(transactions);
  });


app.delete('/transactions/:id', (request, response) => {

    const { id } = request.params;
    const { title, value, type } = request.params;
    const transactionIndex = transactions.findIndex(transaction => transaction.id == id);
    
    if(transactionIndex < 0) {
        return response.status(400).json({error: "Transaction not found"});
    }

    transactions.splice(transactionIndex, 1);

    return response.status(204).send();
})

//iniciar MIDDLEWARES.

//iniciar a porta do insomnia

const port = 3333;
app.listen(port, () => {
  console.log(`👌 Server up and running on PORT ${port}`);
});