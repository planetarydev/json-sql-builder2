# json-sql-builder2

Levelup your Queries with `jsonaql`.

# Why to use jsonaql

You are working with javascript and got the power of json, so why do you concat string by string or worry about query parameters.
When you need to write dynamic queries defined by the user it is also much easier to use JSON instead of generating a string-based query.

Another point is that in most cases the readability and structuring the query is much better than using strings.

Working with the JSON DataType is also much easier (see JSON-Example below).

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

For further details on each Helper or Operators have a look at the complete
documentation at [https://github.com/planetarydev/jsonaql/](https://github.com/planetarydev/jsonaql/sql) and browse through the directories.

## Install

```sh
npm install jsonaql --save
```

## Getting Started

```javascript
const SQLBuilder = require('jsonaql');
// create a new instance of the SQLBuilder and load the language extension for mysql
var sql = new SQLBuilder('MySQL');

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

```

### Support different Data Types

Each Operator and Helper can be used with different Data Types, so it is easy to take the best Data Type that fits your needs.

```javascript
myQuery = sql.$insert({
    $table: 'people',
    $columns: {
        first_name: true,
        last_name: true,
        age: true
    },
    $values: ['John', 'Doe', 40]
});

// is the same as:
myQuery = sql.$insert({
    $table: 'people',
    $columns: ['first_name', 'last_name', 'age'],
    $values: ['John', 'Doe', 40]
});

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3)

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40
}
```

**Using `$documents` Helper as shotcut for `$columns`, `$values`**
```javascript
myQuery = sql.$insert({
    $table: 'people_history',
    $documents: {
        first_name: 'John',
        last_name: 'Doe',
        age: 40
    }
});

// SQL output
INSERT INTO
    people_history (first_name, last_name, age)
VALUES
    ($1, $2, $3)

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40
}
```

### Supporting Keywords

:bulb: **Using Keyword DEFAULT**
```javascript
myQuery = sql.$insert({
    $table: 'people',
    $documents: {
        first_name: 'John',
        last_name: 'Doe',
        age: sql.DEFAULT
    }
});

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, DEFAULT)

// Values
{
    "$1": "John",
    "$2": "Doe"
}
```

## More Examples

Working with SQL-Functions.

```javascript
myQuery = sql.$select({
    people_name: { $concat: ['~~first_name', ' ', '~~last_name'] },
    $from: 'people'
});

// instead using $concat helper as js-function is also possible
myQuery = sql.$select({
	people_name: sql.concat('~~first_name', ' ', '~~last_name'),
	$from: 'people'
});

// SQL output
SELECT
    CONCAT("first_name", $1, "last_name") AS "people_name"
FROM
    "people"

// Values
{
    "$1": " "
}
```

:bulb: **PostgreSQL update jsonb column**
```javascript
myQuery = sql.$update({
    $table: 'people',
    $set: {
        'data->profile->firstName': 'John',
        'data->profile->lastName': 'Doe'
    },
    $where: {
        people_id: 456
    }
});

// SQL output
UPDATE
    "people"
SET
    "data" = jsonb_set(jsonb_set("data", $1, $2), $3, $4)
WHERE
    "people_id" = $5

// Values
{
    "$1": "{profile,firstName}",
    "$2": "\"John\"",
    "$3": "{profile,lastName}",
    "$4": "\"Doe\"",
    "$5": 456
}
```

## Extend SQLBuilder

If there is something missing you can easily extend all your required stuff.
If you will write a new Helper or Operator I would be glad if you will
contribute and share your magic stuff.

The only thing you need to do is browse to the right place inside the `/sql/` directory
and create a new folder and file named with the Helper or Operator.

In our Example we will create the `LEFT()` SQL-Function.

This file will be located at `/sql/helpers/functions/string/`:
- create a new Folder `left`
- create a new File `left/left.js`

Here is the code you need to write for `left.js`:

```javascript
'use strict';

// give the new Class the name of the Helper or Operator
class left extends SQLBuilder.SQLHelper {
    constructor(sql){
        // always call the construtor of SQLHelper
        super(sql);

        // declare the possible types that can be used
        this.Types({
            Object: { syntax: this.Syntax('LEFT(<$str>, <$len>)', SQLBuilder.CALLEE) },
        });

        // define or register each Operator or Helper defined in the Syntax
        this.$str = new SQLBuilder.SQLPredefined.StringValueParam(sql);
        this.$len = new SQLBuilder.SQLPredefined.NumberValueParam(sql);
    }
}

// export the new $left Helper
module.exports = {
    // exports the class-definition (this is used by SQLBuilder to setup the new Helper)
    definition: left,

    // add some description for the auto-generation of the docs README.MD
    description: `Specifies the \`LEFT\` function.`,

    // define the SQL-dialects that support this new Helper
    // Each dialect listed by supported by can use this Helper. If you pass a string
    // that starts with 'http://' or 'https://' inside the docs it automatically creates a link
    // to the official docs
    supportedBy: {
        MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_left',
        MariaDB: 'https://mariadb.com/kb/en/library/left/',
        PostgreSQL: 'https://www.postgresql.org/docs/9.1/static/functions-string.html',
        // SQLite did not support the left() function at this time
        // Oracle did not support the left() function at this time
        // instead we can use SUBSTR( string, start_position [, length ] ) defined as new SQLHelper
        SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/functions/left-transact-sql'
    },

    // Always add at least "Basic Usage" as test and example for each type you
    // have declared by the new class using this.Types()
    examples: {
        Object: {
            // Basic Usage is the Name of the Test and must always declared as function(sql)
            // where sql is the instance of the SQLBuilder
            "Basic Usage": function(sql) {
                // the function always returns an Object {test: function() {}, expectedResults: {} [, supportedBy: { PostgreSQL: true, MySQL: true, ... }] }
                return {
                    // write your test and return always the result
                    test: function(){
                        return sql.$select({
                            test: { $left: { $str: 'Hello World', $len: 5 } }
                        });
                    },
                    // define the expected results of the test as Object with
                    // sql as String and values as Object. If there are no values generated, so define an empty Object values: {}
                    expectedResults: {
                        sql: 'SELECT LEFT($1, $2) AS test',
                        values: {
                            $1: 'Hello World',
                            $2: 5
                        }
                    }
                }
            },
            // Optionally add some more Tests and Examples with a different name:
            "Usage of LEFT as Function": function(sql) {
                return {
                    test: function(){
                        return sql.$select({
                            // The helper can directly used as native js-function because
                            // we setup the Syntax for Type "Object" with SQLBuilder.CALLEE parameter as second (see above)
                            test: sql.left('Hello World', 5)
                        });
                    },
                    expectedResults: {
                        sql: 'SELECT LEFT($1, $2) AS test',
                        values:{
                            $1: 'Hello World',
                            $2: 5
                        }
                    }
                }
            }
        }
    }
}

```
