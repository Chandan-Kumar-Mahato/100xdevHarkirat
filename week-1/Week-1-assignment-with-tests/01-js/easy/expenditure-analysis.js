/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/
let transactions = [
  {
    id: 1,
    timestamp: 1656076800000,
    price: 10,
    category: 'Food',
    itemName: 'Pizza',
  },
  {
    id: 2,
    timestamp: 1656259600000,
    price: 20,
    category: 'Food',
    itemName: 'Burger',
  },
  {
    id: 3,
    timestamp: 1656019200000,
    price: 15,
    category: 'Clothing',
    itemName: 'T-Shirt',
  },
  {
    id: 4,
    timestamp: 1656364800000,
    price: 30,
    category: 'Electronics',
    itemName: 'Headphones',
  },
  {
    id: 5,
    timestamp: 1656105600000,
    price: 25,
    category: 'Clothing',
    itemName: 'Jeans',
  },
];

function calculateTotalSpentByCategory(transactions) {
  if(transactions.length==0)
  {
    return [];
  }
  
  var spendDetails ={};

  // here transactions is the array of transactions and iterating over each elements leads me to new obj
  for(let i = 0;i<transactions.length;i++)
  {
    var trans = transactions[i];
    /*
    { 
      itemName: "banana",
      category:"fruits",
      price:210,
      timestamp : "2-oct-2023" 
  },
    */
    if(spendDetails[trans.category])
    {
      // fruits:20;
      spendDetails[trans.category] = spendDetails[trans.category] + trans.price;
    }
    else
    {
      spendDetails[trans.category] = trans.price; // here fruits: 100;
    }
  }


  // Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
  var keysColl = Object.keys(spendDetails);
  // console.log(spendDetails);
  // // first lets make the keys of the array
  // console.log(keysColl);


  var finalAns = [];
  for(let i = 0;i<keysColl.length;i++)
  {
    var obj = {
      category: keysColl[i],
      totalSpent: spendDetails[keysColl[i]]
    }
    finalAns.push(obj);
  }
  return finalAns;


}

console.log(calculateTotalSpentByCategory(transactions));
module.exports = calculateTotalSpentByCategory;
