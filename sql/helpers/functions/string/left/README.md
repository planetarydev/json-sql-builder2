# left Helper
Specifies the `LEFT` function.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_left)
- [MariaDB](https://mariadb.com/kb/en/library/left/)
- [PostgreSQL](https://www.postgresql.org/docs/9.1/static/functions-string.html)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/functions/left-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `left` as **Object** with the following Syntax:

**Syntax:**

```javascript
$left: { ... }
```

**SQL-Definition:**
```javascript
LEFT(<$str>, <$len>)
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[str](./private/str/)|:heavy_check_mark:|*private*||
[len](./private/len/)|:heavy_check_mark:|*private*||

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        test: { $left: { $str: 'Hello World', $len: 5 } }
    });
}

// SQL output
SELECT
    LEFT($1, $2) AS test

// Values
{
    "$1": "Hello World",
    "$2": 5
}
```

## Further Examples

:bulb: **Usage of LEFT as Function**
```javascript
function() {
    return sql.$select({
        // The helper can directly used as native js-function because
        // we setup the Syntax for Type "Object" with SQLBuilder.CALLEE parameter as second (see above)
        test: sql.left('Hello World', 5)
    });
}

// SQL output
SELECT
    LEFT($1, $2) AS test

// Values
{
    "$1": "Hello World",
    "$2": 5
}
```

