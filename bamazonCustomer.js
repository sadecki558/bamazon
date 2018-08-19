var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "matt14961364",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    forsale();
});

function forsale() {
    let query = "SELECT * FROM products";

    connection.query(query, function (err, res) {
        if (err) {
            throw err;
        }
        for (let i = 0; i < res.length; i++) {
            console.log(`\nID: ${res[i].item_id}\n`, `Name: ${res[i].product_name}\n`, `Department: ${res[i].department_name}\n`, `Price: $${res[i].price}`);
        }
        console.log(`\n---------------------------------------------------`);
        customerOrder();
    })

}

function customerOrder() {
    inquirer.prompt([
        {
            name: "purchase",
            type: "input",
            message: "Which product would you like to buy? (Insert ID)",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "amount",
            type: "input",
            message: "How many would you like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
        .then(function (answers) {
            console.log(`\n-------------------`);
            let query = `SELECT price, stock_quantity, product_name FROM products WHERE item_id = ${answers.purchase}`;
            if (answers.purchase==0){
                connection.end();
            }

            connection.query(query, function (err, res) {
                if (err){
                    throw err;
                }

                if (answers.amount > res[0].stock_quantity) {
                    console.log('Insufficient quantity!');
                    forsale();
                } 
                else {
                    let stock = res[0].stock_quantity - answers.amount;
                    let totalCost = res[0].price * answers.amount;
                    let revenue = res[0].product_sales + totalCost;
                    let query = `UPDATE products SET stock_quantity = ${stock}, product_sales = ${revenue} WHERE item_id = ${answers.purchase}`;
                    console.log(`You have successfully made your purchase! The total cost is $${parseFloat(totalCost).toFixed(2)}.`);
                    //let query2 = "UPDATE products SET  "
                    forsale();
                }
            })
        })
}