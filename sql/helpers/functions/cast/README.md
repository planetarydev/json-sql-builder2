# cast Helper
Specifies the `CAST` function.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/10/functions-formatting.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions193.htm)

# Allowed Types and Usage

## as Object:

Usage of `cast` as **Object** with the following Syntax:

**Syntax:**

```javascript
$cast: { ... }
```

**SQL-Definition:**
```javascript
CAST(<$expr> AS <$format>)
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[expr](./private/expr/)|:heavy_check_mark:|*private*||
[format](./private/format/)|:heavy_check_mark:|*private*||

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        cast_value: { $cast: { $expr: '2017-02-31', $format: 'varchar' } }
    });
}

// SQL output
SELECT
    CAST($1 AS $2) AS cast_value

// Values
{
    "$1": "2017-02-31",
    "$2": "varchar"
}
```

