# date Helper
Specifies the `DATE` function.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/10/functions-formatting.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions193.htm)

# Allowed Types and Usage

## as String:

Usage of `date` as **String** with the following Syntax:

**Syntax:**

```javascript
$date: < String >
```

**SQL-Definition:**
```javascript
DATE(<value-param>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        my_timestamp: { $date: '~~foo.column' },
        $from: 'foo'
    });
}

// SQL output
SELECT
    DATE(foo.column) AS my_timestamp
FROM
    foo

// Values
{}
```

