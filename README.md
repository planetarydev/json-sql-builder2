# json-sql-builder2

Levelup your Queries with `jsonaql`.

# Why to use jsonaql

You are working with javascript and got the power of json, so why do you concat string by string or worry about query parameters.
When you need to write dynamic queries defined by the user it is also much easier to use JSON instead of generating a string-based query.

Another point is that in most cases the readability and structuring the query is much better than using strings.

## Supported SQL-Dialects

By default `jsonaql` supports the follwing languages.
- [x] MySQL
- [x] MariaDB
- [x] PostgreSQL
- [x] SQLite
- [x] Oracle
- [x] Microsoft SQL Server

## Documentation
Each Operator and Helper is well documented. And you've got a lot of examples for each.

For further details on the language specific helpers and operators have a look at the complete
documentation at [https://planetarydev.github.io/jsonaql/](https://planetarydev.github.io/jsonaql/sql) and browse through the directories.

## Install

```sh
npm install jsonaql --save
```

## Getting Started

```javascript
const SQLBuilder = require('jsonaql');
// create a new instance of the SQLBuilder and load the language extension for mysql
var sql = new SQLBuilder('PostgreSQL');

// lets start some query fun
var totalSalary = sql.$select({
    job_title: true,
    total_salary: { $sum: 'salary' }
    $from: 'people',
    $where: {
        job_title: { $in: ['Sales Manager', 'Account Manager'] },
        age: { $gte: 18 },
        country_code: 'US',
    },
    $groupBy: 'job_title',
});

```

**Result**
```javascript
// totalSalary.sql
SELECT
    `job_title`,
    SUM(`salary`) AS `total_salary`
FROM
    `people`
WHERE
    `job_title` IN (?, ?)
AND `age` >= ?
AND `country_code` = ?
GROUP BY
    `job_title`

// totalSalary.values
['Sales Manager', 'Account Manager', 18, 'US']


// general output
queryOutput = {
	sql: 'Your SQL-query-string'
	values: ['Array', 'with', 'all', 'Query-values']
}

```
