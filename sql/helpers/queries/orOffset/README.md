# top Helper
Specifies the `OFFSET` clause for the `SELECT` Statement for Oracle db only.

#### Supported by
- [Oracle](https://www.oracletutorial.com/oracle-basics/oracle-fetch/)

# Allowed Types and Usage

## as Number:

Usage of `orOffset` as **Number** with the following Syntax:

**Syntax:**

```javascript
$orOffset: 10 // it will fetch 10 rows only
```

**SQL-Definition:**
```sql
OFFSET 10 ROWS
```

:bulb: **Example:**
```javascript
function() {
    let query = sql.build({
        $select: {
            $orOffset: 10,
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
OFFSET 10 ROWS

// Values
{}
```
