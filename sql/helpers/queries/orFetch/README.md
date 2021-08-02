# top Helper
Specifies the `FETCH` clause for the `SELECT` Statement for Oracle db only.

#### Supported by
- [Oracle](https://www.oracletutorial.com/oracle-basics/oracle-fetch/)

# Allowed Types and Usage

## as Number:

Usage of `ssFetch` as **Number** with the following Syntax:

**Syntax:**

```javascript
$orFetch: 10 // it will fetch 10 rows only
```

**SQL-Definition:**
```sql
FETCH NEXT 15 ROWS ONLY
```

:bulb: **Example:**
```javascript
function() {
    let query = sql.build({
        $select: {
            $orFetch: 10,
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
FETCH NEXT 10 ROWS ONLY

// Values
{}
```
