# count Helper
Specifies the aggregation function `COUNT` as Helper.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/group-by-functions.html#function_count)
- [MariaDB](https://mariadb.com/kb/en/library/count/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-aggregate.html)
- [SQLite](https://sqlite.org/lang_aggfunc.html#count)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions032.htm)
- [SQLServer](https://docs.microsoft.com/en-US/sql/t-sql/functions/count-transact-sql)

# Allowed Types and Usage

## as String:

Usage of `count` as **String** with the following Syntax:

**Syntax:**

```javascript
$count: < String >
```

**SQL-Definition:**
```javascript
COUNT(<value-ident>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        total: { $count: '*' },
        $from: 'people',
        $where: {
            age: 18
        }
    });
}

// SQL output
SELECT
    COUNT(*) AS total
FROM
    people
WHERE
    age = $1

// Values
{
    "$1": 18
}
```

