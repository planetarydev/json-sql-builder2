# and Helper
Specifies the logical `AND` Operator as Helper.

## Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/logical-operators.html#operator_and)
- [MariaDB](https://mariadb.com/kb/en/library/and/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-comparison.html)
- [SQLite](https://sqlite.org/lang_expr.html)
- Oracle
- SQLServer

## Allowed Types and Usage

### as Array:

The Usage of `and` as **Array** is restricted to childs have the following Type:

- String
- Object
- Function

#### as Array->String:

Usage of `and` as **Array** with a child of Type **String** :

**Syntax:**

```javascript
$and: [
    <String> [, ... ]
]
```

**SQL-Definition:**
```javascript
<value>[  AND ... ]
```

**Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                $and: [
                    "COALESCE(gender, 'male') = 'male'",
                    { last_name: { $eq: 'Doe' } }
                ]
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
WHERE
    COALESCE(gender, 'male') = 'male'
    AND last_name = $ 1

// Values
{
    "$1": "Doe"
}
```
#### as Array->Object:

Usage of `and` as **Array** with a child of Type **Object** :

**Syntax:**

```javascript
$and: [
    { ... } [, ... ]
]
```

**SQL-Definition:**
```javascript
<key-ident> <value>[  AND ... ]
```

**Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                $and: [
                    { first_name: { $eq: 'Jane' } },
                    { last_name: { $eq: 'Doe' } }
                ]
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
WHERE
    first_name = $ 1
    AND last_name = $ 2

// Values
{
    "$1": "Jane",
    "$2": "Doe"
}
```
#### as Array->Function:

Usage of `and` as **Array** with a child of Type **Function** :

**Syntax:**

```javascript
$and: [
    sql.<callee>([params]) [, ... ]
]
```

**SQL-Definition:**
```javascript
<value>[  AND ... ]
```

**Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                $and: [
                    sql.cmp('~~first_name', '=', 'Jane'),
                    { last_name: { $eq: 'Doe' } }
                ]
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
WHERE
    first_name = $ 1
    AND last_name = $ 2

// Values
{
    "$1": "Jane",
    "$2": "Doe"
}
```
