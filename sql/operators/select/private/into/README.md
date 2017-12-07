# into Helper
Specifies the `INTO` clause for the `SELECT` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select-into.html)
- [MariaDB](https://mariadb.com/kb/en/library/selectinto/)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/select-into-clause-transact-sql)

# Allowed Types and Usage

## as String:

Usage of `into` as **String** with the following Syntax:

**Syntax:**

```javascript
$into: < String >
```

**SQL-Definition:**
```javascript
INTO <value-ident>
```

:bulb: **Example:**
```javascript
function() {
    let query = sql.build({
        $select: {
            people_id: 1,
            $into: '@people_id',
            $from: 'people',
            $limit: 1
        }
    });

    return query;
}

// SQL output
SELECT
    people_id INTO @people_id
FROM
    people
LIMIT
    $1

// Values
{
    "$1": 1
}
```

## Further Examples

:bulb: **Basic Usage for SQLServer**
```javascript
function() {
    let query = sql.build({
        $select: {
            $into: 'tmp_people_table',
            $from: 'people'
        }
    });

    return query;
}

// SQL output
SELECT
    * INTO tmp_people_table
FROM
    people

// Values
{}
```

