const SQLBuilder = require('../index');

let obj = {
    $from: 'MAYUR.Persons',
    $where: {id: 'Mayur'}
    // $where: {id: 1}
};

const sql = new SQLBuilder('Oracle', {quoteIdentifiers: true});
let output = sql['$select'](obj);

console.log(output.sql);
console.log(output.values);
