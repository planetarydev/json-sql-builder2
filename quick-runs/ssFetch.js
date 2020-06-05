const SQLBuilder = require('../index');

let obj = {
    $from: 'dbo.Products',
    $ssFetch: {
        $skip: 30,
        $fetch: 10,
    },
    $orderBy: 'ProductName'
};

const sql = new SQLBuilder('SQLServer');
let output = sql['$select'](obj);

console.log(output.sql);
console.log(output.values);
