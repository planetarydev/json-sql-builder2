# top Helper
Specifies the `TOP` clause for the `SELECT` Statement.

#### Supported by
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/top-transact-sql)

# Allowed Types and Usage

## as Number:

Usage of `ssFetch` as **Number** with the following Syntax:

**Syntax:**

```javascript
$ssFetch: {
    $skip: 30, // it will skip 30 rows
    $fetch: 10 // it will fetch next 10 rows
}
```

**SQL-Definition:**
```sql
OFFSET 30 ROWS FETCH FIRST 10 ROWS ONLY
```

:bulb: **Example:**
```javascript
function() {
    let query = sql.build({
        $select: {
            $ssFetch: {
                $skip: 30,
                $fetch: 10
            },
            $from: 'people'
        }
    });

    return query;
}

// SQL output
SELECT
    *
FROM
    people
OFFSET 30 ROWS FETCH FIRST 10 ROWS ONLY

// Values
{}
```
