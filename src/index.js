const express = require("express");
const {uuid, isUuid} = require("uuidv4");
const app = express();
app.use(express.json());

const transactions = [];

//iniciar MIDDLEWARES.
function verifyUID (request, response, next){
    const { id } = request.params;

    if (!isUuid(id)) {
        return response.status(400).json({ error: "Param sent is not a valid UUID" });
    }
    next();
}

function uuidExistence (request, response, next){
    const { id } = request.params;
    request.transactionIndex = id;

    next()
}


function logRequests(request,response, next){
    const {method,url} = request;
    
    const logLabel = `[${method.toUpperCase()}] ${url}`//[GET] /projects?title=react
    console.log(logLabel);
    
    return next(); //próximo middleware
}

app.use("/transactions/:id", verifyUID, uuidExistence);
app.use(logRequests);

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
    const transactionId = transactions.findIndex((transaction) => transaction.id === id);

    if(transaction.id === request.transactionIndex){
    const transaction = {
    id,
    title,
    value,
    type
    };
    
    transactions[transactionId] = transaction;

    return response.json(transactions);


    } else {
        return response.status(404).json({error:"Not Found"});
    }
  });


app.delete('/transactions/:id', (request, response) => {
    const { id } = request.params;
    const transactionId = transactions.findIndex((transaction) => transaction.id === id);

    if(transaction.id === request.transactionIndex){
        if(transactionId < 0) {
            return response.status(400).json({error: "Transaction not found"});
        }
    
        transactions.splice(transactionId, 1);
        return response.status(204).json({error: "Done"});
    } else {
        return response.status(404).json({error:"Not Found"});
    }
})

const port = 3333;
app.listen(port, () => {
  console.log(`👌 Server up and running on PORT ${port}`);
});