const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

require('./src/database/connection');

Users = require('./src/routes/Users');
Categories = require('./src/routes/Categories');
SubCategories = require('./src/routes/SubCategories');
Products = require('./src/routes/Products');
Reviews = require('./src/routes/Reviews');
Transactions = require('./src/routes/Transactions');
Cart = require('./src/routes/Carts');

app.use("/users", Users);
app.use("/categories", Categories);
app.use("/sub_categories", SubCategories);
app.use("/products", Products);
app.use("/reviews", Reviews);
app.use("/transactions", Transactions);
app.use("/carts", Cart);

app.listen(port, err => {
  if (err) return console.log(`Cannot Listen on PORT: ${port}`);
  console.log(`Server is Listening on: http://localhost:${port}`)
})